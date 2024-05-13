import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import jwt from "jsonwebtoken";

const app = express();
const port = 5000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "streamlined-service-portal",
  password: "root",
  port: "5432",
});

db.connect();

const KEY = "secret_key";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Token not valid
    req.user = user;
    next();
  });
};

//get all users
app.get("/users", authenticateToken, async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  const users = result.rows;

  res.json(users);
});

app.get("/user/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting user: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//delete a user
app.delete("/user/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//register a user
app.post("/user", async (req, res) => {
  //const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;
  const employee_id = req.body.employee_id;
  const email = req.body.email;
  const department = req.body.department;
  try {
    const result = await db.query(
      "INSERT INTO users (username, password, employee_id, email, department) VALUES ($1, $2, $3, $4, $5)",
      [username, password, employee_id, email, department]
    );
    console.log(result.rows);
    res.status(200).json({ message: "User registered succesfully." });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//login a user
app.post("/login", async (req, res) => {
  // const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;
  console.log("Received Username:", username);
  console.log("Received Password:", password);
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    //checks if there is no user
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Account is not registered." });
    }

    //if user is valid
    const user = result.rows[0]; //gets the first data in the row from the database
    const isPasswordMatch = password === user.password;

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    //generate token
    const token = jwt.sign({ userId: user.id }, KEY, { expiresIn: "1h" });

    return res.json({
      message: "Login successful",
      token: token,
      userId: user.id,
    });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
