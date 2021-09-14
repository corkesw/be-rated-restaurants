const { Pool } = require ('pg')

//default to dev version:
const ENV = process.env.NODE_ENV || 'development'

require('dotenv')
.config( {
    path: `${__dirname}/../.env.${ENV}`,
})
//console.log(process.env, ">>>>>>>>>>>>>>>>>>>>")

const db = new Pool()

if (!process.env.PGDATABASE) {
    throw new Error ('PGDATABASE not set')
} 


module.exports = db

