require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/dbConn');
const userRoutes=require('./routes/userRoutes');
const PORT = process.env.PORT || 8080;
const cors=require('cors');
const logger=require('morgan');
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
connectDB();
app.use('/api',userRoutes);

mongoose.connection.once("open",()=>{ console.log(`Mongoo is connected`); app.listen(PORT,()=> console.log(`Server running ${PORT} `))})
mongoose.connection.on("error",(err)=>{console.log(err); logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')})

