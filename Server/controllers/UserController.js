import express from "express";
import Auth from "../middlewares/auth.js";

class UserController {
  constructor(database) {
    this.db = database;
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/users",
      Auth.authenticateToken,
      this.getAllUsers.bind(this)
    );
    this.router.get(
      "/user/:id",
      Auth.authenticateToken,
      this.getUserById.bind(this)
    );
    this.router.delete(
      "/user/:id",
      Auth.authenticateToken,
      this.deleteUser.bind(this)
    );
    this.router.post("/user", this.registerUser.bind(this));
    this.router.post("/login", this.loginUser.bind(this));
  }

  async getAllUsers(req, res) {
    try {
      const result = await this.db.query("SELECT * FROM users");
      res.json(result.rows);
    } catch (error) {
      console.error("Error getting users: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async getUserById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const result = await this.db.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error getting user: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async deleteUser(req, res) {
    const id = parseInt(req.params.id);
    try {
      await this.db.query("DELETE FROM users WHERE user_id = $1", [id]);
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async registerUser(req, res) {
    const {
      firstname,
      lastname,
      username,
      password,
      employee_id,
      email,
      department,
    } = req.body;
    try {
      await this.db.query(
        "INSERT INTO users (username, password, employee_id, email, department, firstname, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          username,
          password,
          employee_id,
          email,
          department,
          firstname,
          lastname,
        ]
      );
      res.status(200).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error registering user: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async loginUser(req, res) {
    const { username, password } = req.body;
    try {
      const result = await this.db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (result.rows.length === 0) {
        return res.status(400).json({ message: "Account is not registered." });
      }

      const user = result.rows[0];
      const isPasswordMatch = password === user.password;

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const token = Auth.generateToken(user.user_id);
      res.json({ message: "Login successful", token, userId: user.user_id });
    } catch (error) {
      console.error("Error during login: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
