import RequestController from '../controllers/RequestController.js';
import Database from '../models/Database.js';

const db = new Database();
const requestController = new RequestController(db);

export default requestController.router;
