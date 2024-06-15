const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({path:'./config/config.env' });

//Connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on ${process.env.HOST}: ${PORT}`));


app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
})