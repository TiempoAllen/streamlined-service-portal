import UserController from '../controllers/UserController.js';
import Database from '../models/Database.js';

const db = new Database();
const userController = new UserController(db);

export default userController.router;
