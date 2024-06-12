import express from "express";
import Auth from "../middlewares/auth.js";

class RequestController {
  constructor(database) {
    this.db = database;
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.delete(
      "/request/:id",
      Auth.authenticateToken,
      this.deleteRequestById.bind(this)
    );
    this.router.get(
      "/request/all",
      Auth.authenticateToken,
      this.getAllRequests.bind(this)
    );
    this.router.post("/request", this.createRequest.bind(this));
  }

  async deleteRequestById(req, res) {
    const id = parseInt(req.params.id);
    try {
      await this.db.query("DELETE FROM request WHERE requestid = $1", [id]);
      res.status(200).json({ message: "Request deleted successfully." });
    } catch (error) {
      console.error("Error deleting request: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async getAllRequests(req, res) {
    try {
      const result = await this.db.query("SELECT * FROM request");
      res.json(result.rows);
    } catch (error) {
      console.error("Error getting requests: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async createRequest(req, res) {
    const { purpose, datetime, request_location, user_id, technician } =
      req.body;
    const status = "pending";

    try {
      const userResult = await this.db.query(
        "SELECT department, firstname, lastname FROM users WHERE user_id = $1",
        [user_id]
      );
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const { department, user_firstname, user_lastname } = userResult.rows[0];

      const result = await this.db.query(
        "INSERT INTO request (purpose, datetime, status, request_location, department, user_id, user_firstname, user_lastname, technician) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [
          purpose,
          datetime,
          status,
          request_location,
          department,
          user_id,
          user_firstname,
          user_lastname,
          technician,
        ]
      );

      console.log(result.rows);
      res.status(200).json({ message: "Request created successfully." });
    } catch (error) {
      console.error("Error during request: ", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

export default RequestController;
