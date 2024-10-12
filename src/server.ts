require('dotenv').config();
const bodyParser = require('body-parser');
import express from 'express';
import http from 'http';
import cors from 'cors';
import routes from './routes';
try {
  const app = express();
  const server = http.createServer(app);
  
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(`/api`, routes);
  
  server.listen(process.env.PORT || 3333, async () => {
    console.log(`==> SERVICE STARTED`);
  }); 

} catch (error: any) {
  console.log(error.message)
}

