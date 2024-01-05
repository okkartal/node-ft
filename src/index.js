const express = require('express'),
    app = express(),
    port = process.env.APP_PORT || 3001,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    errorHandler = require('./middlewares/errorHandler'),
    verifyApiKey = require("./middlewares/apiKeyAuth");

  // mongoose connection
  const connectDB = require('./config/dbConnection');
  //db connection
  connectDB();

  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(verifyApiKey);
app.use(errorHandler);
app.use('/', require('./routes/apiRoutes'));

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log(`A node js API is listening in port : ${port}`)
    });
})