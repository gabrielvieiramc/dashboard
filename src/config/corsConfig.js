const corsOptions = {
    origin: ['https://dashboardmc.azurewebsites.net', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
  module.exports = corsOptions;
  