const request = require("supertest");
const db = require("../db");
const app = require("../app.js");

afterAll(() => db.end());

describe(" GET/api", () => {
  test("200: should respond 200 with all ok message", () => {
    return request(app)
      .get("/api") //URL path
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("all ok");
      });
  });
  test("404: when given invalid URL", () => {
    return request(app)
      .get("/apb") //URL path
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid URL");
      });
  });
});

describe("GET/api/restaurants", () => {
  test("should respond 200 with an array of restaurants", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.restaurants)).toBe(true);
        expect(res.body.restaurants[0]).toEqual(
          expect.objectContaining({
            area_id: expect.any(Number),
            restaurant_name: expect.any(String),
            area_id: expect.any(Number),
            cuisine: expect.any(String),
            website: expect.any(String),
          })
        );
      });
  });
});

describe("POST /api/restaurants", () => {
  test("201: responds with newly added restaurant", () => {
    const newData = {
      restaurant_name: "The Codfather",
      area_id: 2,
      cuisine: "British",
      website: "www.thecodfather.com",
    };
    return request(app)
      .post("/api/restaurants")
      .send(newData)
      .expect(201)
      .then((res) => {
        expect(res.body.restaurant).toEqual({
          restaurant_id: 9,
          ...newData,
        });
      });
  });
  test("400: responds with Bad Request when no restaurant name provided", () => {
    const newData = {
      area_id: 2,
      cuisine: "British",
      website: "www.thecodfather.com",
    };
    return request(app)
      .post("/api/restaurants")
      .send(newData)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
  test("400: responds with Bad Request when a field length exceed limit set", () => {
    const newData = {
      restaurant_name: "The Codfather",
      area_id: 2,
      cuisine: "British",
      website: "www.thecodfather.com...this is a very long wed address",
    };
    return request(app)
      .post("/api/restaurants")
      .send(newData)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/restaurants/:restaurant_id", () => {
  test("204: responds with 'No content'", () => {
    return request(app)
      .delete("/api/restaurants/1")
      .expect(204)
      .then((res) => {
        return db.query(`SELECT * FROM restaurants`).then((restaurants) => expect(restaurants.rows.length).toBe(8))
      });
  });
  test('404: responds with error is request is NaN', () => {
    return request(app)
    .delete("/api/restaurants/notanumber")
    .expect(400)
    .then((res) => {
      expect(res.body.msg).toBe('Bad request')
    })
  });
  test('404: responds with error when resource does not exist', () => {
    return request(app)
    .delete("/api/restaurants/99")
    .expect(404)
    .then((res) => {
      expect(res.body.msg).toBe("No entry found for restaurant_id 99")
        })
  });
});

describe('PATCH /api/restaurants/:restaurant_id', () => {
  test('200: responds with updated restaurant object ', () => {
    return request(app)
    .patch('/api/restaurants/3')
    .send({area_id: 2})
    .expect(200)
    .then((res) => {
      expect(res.body).toEqual(
        {
          "restaurant": {
            "restaurant_id": 3,
            "restaurant_name": "Rudys Pizza",
            "area_id": 2,
            "cuisine": "Neapolitan Pizzeria",
            "website": "http://rudyspizza.co.uk/"
          }
        }
      )
    })
  });
  test('400: responds with error when malformed body', () => {
    return request(app)
    .patch('/api/restaurants/3')
    .send({banana: 2})
    .expect(400)
    .then((res) => {
      expect(res.body.msg).toEqual('Bad request')
    })
  });
  test('400: responds with error when datatype incorrect', () => {
    return request(app)
    .patch('/api/restaurants/3')
    .send({area_id: 'onion'})
    .expect(400)
    .then((res) => {
      expect(res.body.msg).toEqual('Bad request')
    })
  });
});
