const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/v1/auth", authRoutes);

const userRoutes = require("./routes/user.routes");

app.use("/api/v1", userRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/api/v1", taskRoutes);

// Error handler (must be last)
const errorHandler = require("./utils/errorHandler");
app.use(errorHandler);

module.exports = app;
