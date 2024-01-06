const swaggerAutogen = require('swagger-autogen'); 

swaggerAutogen('./swagger_output.json', ['./routes/apiRoutes.js']);