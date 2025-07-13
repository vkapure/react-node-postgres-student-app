const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// CRUD Routes
router.post("/", studentController.createStudent);
router.get("/", studentController.getStudents); // with pagination
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
