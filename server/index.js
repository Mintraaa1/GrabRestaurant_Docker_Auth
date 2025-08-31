import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./models/index.js"; // Sequelize models
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init roles function
const initRoles = async () => {
  const roles = [
    { id: 1, name: "user" },
    { id: 2, name: "moderator" },
    { id: 3, name: "admin" },
  ];
  for (const role of roles) {
    await db.Role.findOrCreate({ where: { id: role.id }, defaults: { name: role.name } });
  }
  console.log("Roles initialized!");
};

// Test DB connection and sync tables
db.sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully!");
    // Sync tables without dropping existing data
    return db.sequelize.sync({ alter: true });
  })
  .then(async () => {
    console.log("Tables synced!");
    await initRoles(); // initialize roles if not exist
  })
  .then(() => {
    // Start server after DB is ready
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to database:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Restaurant Restful API Completed");
});

app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);
