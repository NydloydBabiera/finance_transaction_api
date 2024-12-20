const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequilize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PGPORT,
        dialect: 'postgres'
    }
)

module.exports = sequilize