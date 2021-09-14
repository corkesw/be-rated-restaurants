const app = require ('./app')
const {fetchRestaurants} = require('./model')

exports.message = (req, res) => {
    //console.log("Controller check>>>>>>>")
    res.status(200)
    res.send( {message:"all ok"} )
}

exports.getRestaurants = (req, res) => {
    fetchRestaurants()
    .then((result) =>{

        res.status(200)
        res.send({restaurants:result})

    })
}