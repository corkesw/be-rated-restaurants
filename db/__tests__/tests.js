const request = require('supertest')

const app = require('../app.js')

describe(' GET/api', () => {

    test('should respond 200 with all ok message', () => {
        return request(app)
        
        .get('/api') //URL path
        .expect(200)
        
        .then(res => {
            expect(res.body.message).toBe("all ok")
        })

    });
    
});

describe('GET/api/restaurants', () => {

    test('should respond 200 with an array of restaurants', () => {
        return request(app)

        .get('/api/restaurants')
        .expect(200)
        
        .then(res => {
            console.log(res.body.restaurants)
            expect(Array.isArray(res.body.restaurants)).toBe(true)
        })


        
    });
    
});