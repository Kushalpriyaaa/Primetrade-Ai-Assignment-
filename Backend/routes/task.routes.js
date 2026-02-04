const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authMiddleware = require("../middleware/auth.middleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");

// Validation rules for task title
const taskValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters")
];

const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters")
];

router.post("/tasks", authMiddleware, createTaskValidation, createTask);
router.get("/tasks", authMiddleware, getTasks);
router.put("/tasks/:id", authMiddleware, taskValidation, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router;
