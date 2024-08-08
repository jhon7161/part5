require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_DB_URLL
  : process.env.DB_URLL

module.exports = {
  MONGODB_URI,
  PORT
}