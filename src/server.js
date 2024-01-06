const express = require('express'),
    app = express(),
    port = process.env.APP_PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    errorHandler = require('./middlewares/errorHandler'),
    verifyApiKey = require("./middlewares/apiKeyAuth"),
    swaggerDocs = require('./swagger');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

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
 // Swagger Page
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/', require('./routes/apiRoutes'));
app.use(errorHandler);

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log(`A node js API is listening in port : ${port}`)
    });
})