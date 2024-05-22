require('dotenv').config()

let PORT = process.env.PORT
const mongoUrl = process.env.node_env === 'test' 
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI
// const mongoUrl = process.env.MONGODB_URI
module.exports = {
    mongoUrl,
    PORT
  }