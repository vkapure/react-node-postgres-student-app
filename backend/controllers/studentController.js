const pool = require("../db");

// Create student with optional marks
exports.createStudent = async (req, res) => {
  try {
    const { name, email, age, parent_id, marks } = req.body;

    const studentResult = await pool.query(
      "INSERT INTO school.students (name, email, age, parent_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, age, parent_id || null]
    );

    const student = studentResult.rows[0];

    if (marks && marks.length) {
      for (const { subject, score } of marks) {
        await pool.query(
          "INSERT INTO school.marks (student_id, subject, score) VALUES ($1, $2, $3)",
          [student.id, subject, score]
        );
      }
    }

    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating student" });
  }
};

// Get all students with pagination
exports.getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      "SELECT * FROM school.students ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM school.students"
    );

    res.json({
      students: result.rows,
      total: parseInt(totalResult.rows[0].count),
      page,
      limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving students" });
  }
};

// Get one student with marks
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await pool.query(
      "SELECT * FROM school.students WHERE id = $1",
      [id]
    );

    if (student.rows.length === 0)
      return res.status(404).json({ error: "Student not found" });

    const marks = await pool.query(
      "SELECT subject, score FROM school.marks WHERE student_id = $1",
      [id]
    );

    res.json({
      ...student.rows[0],
      marks: marks.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving student" });
  }
};

// Update student info
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, parent_id } = req.body;

    const result = await pool.query(
      "UPDATE school.students SET name = $1, email = $2, age = $3, parent_id = $4 WHERE id = $5 RETURNING *",
      [name, email, age, parent_id || null, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Student not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating student" });
  }
};

// Delete student and their marks (CASCADE works here)
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM school.students WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Student not found" });

    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting student" });
  }
};
