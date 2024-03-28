import swaggerAutogen from 'swagger-autogen';

const options = {
    openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: false,       // Enable/Disable automatic query capture. By default is true
    autoBody: false         // Enable/Disable automatic body capture. By default is true
}

const doc = {
  info: {
    version: '1.0.0',
    title: 'Park Management System',
    description: 'Park Management System API Documentation',
  },
  host: 'localhost:3009',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'PMS',
      description: 'Park Management System API',
    },
  ],
  servers: [
    {
      url: "http://localhost:3009/",
      description: "dev server"
    }
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be "header", "query" or "cookie"
      name: 'X-API-KEY', // name of the header, query parameter or cookie
      description: 'any description...',
    },
  },
  definitions: {
    User: {
      name: 'Adeseluka Toba Samuel',
      diplomas: [
        {
          school: 'ALX University',
          year: 2024,
          completed: true,
        },
      ],
    },
    AddUser: {
      $name: 'Anthony Ifeanyi Nwanbosi',
      about: '',
    },
  },
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./routes/index.js'];
swaggerAutogen(options)(outputFile, endpointsFiles, doc);
