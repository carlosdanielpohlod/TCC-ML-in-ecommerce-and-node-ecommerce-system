require('dotenv').config({path: '.env'})

config = {
 
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
    define:{
      timestamps: false
    }
  
  
}
module.exports = config