const express = require('express');
const cors = require('cors');
require('colors');
const morgan = require('morgan');
const formidableMiddleware = require('express-formidable');


const dotenv = require('dotenv');
const allRoute = require('./routes');
const handleError = require('./middlewares/handleError');
const connectDB = require('./config/db');

dotenv.config()


// rest obbject 
const app = express();

// apply middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())
app.use(formidableMiddleware());

// rest api
app.use('/api/v1', allRoute)


// handle error
app.use(handleError)

const PORT = process.env.PORT || 6000
const MODE = process.env.DEV_MODE
const DB_STRING = process.env.DB_STRING



// db options 
const OPTIONS = {
    dbName:process.env.DB_NAME,
    user:process.env.DB_USER,
    pass:process.env.DB_PASS,
}


// rest server
app.listen(PORT, (err) => {
    connectDB(DB_STRING,OPTIONS)
    if (err) {
        console.log(err)
    } else {
      console.log(`Server is running on ${MODE} mode on port:${PORT}`.america)
    }
})