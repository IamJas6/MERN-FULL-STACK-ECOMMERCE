//packages import
require('dotenv').config(); //to read .env file
const express = require('express');  //importing express
const app = express();              //initializing express  
const mongoose = require('mongoose');      // importing mongoose 
const bodyParser = require('body-parser'); //importing body-parser
const fileUpload = require('express-fileupload'); //importing express-fileupload
const cors = require('cors')


app.use(fileUpload());  //to upload files
app.use(express.static('uploads')); //to render files to user
app.use(bodyParser.json()); //to parse json data from body of request
app.use(cors())


//Routes
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const checkoutRoute = require('./routes/checkout');
const orderRoute = require('./routes/order');


//DataBase
// Connect to MongoDB database using Mongo Atlas
mongoose.connect(process.env.db_url)
  .then(()=>{
    console.log('connected to db');
  })
  .catch((error)=>{
    console.log('error in connecting:',error);
  })


//app
app.get('/', function (req, res) {
  res.send('hello mern!');   //sending hello mern
})

app.use('/api', userRoute); //api/user will be added before the path defined here i.e. /api
app.use('/api', categoryRoute); //api/user will be added before the path defined here i.e. /api
app.use('/api', productRoute)
app.use('/api', cartRoute)
app.use('/api', checkoutRoute)
app.use('/api', orderRoute)

//Port
const PORT = process.env.PORT; //to get port from .env

app.listen(PORT, () => {      //to listen on port
  console.log(`Server is running on port ${PORT}`); //to print port
})