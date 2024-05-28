import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  initializeRoutes() {
    this.app.use('/api', userRoutes);
    this.app.use('/api', requestRoutes);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
}

export default App;
