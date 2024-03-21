const express = require("express");
const app = express();

// 2. LOGGING

const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "requests.log"),
  { flags: "a" }
);

// custom format function for logs; saved to requests.log
const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      timestamp: tokens.date(req, res, "web"),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(tokens["response-time"](req, res)),
    });
  },
  { stream: accessLogStream }
);

// setup middleware
app.use(express.json());
app.use(morganMiddleware);

// 5. DEPENDENCY INJECTION

const StudentService = require("./service/studentService");
const studentService = new StudentService();

// 1. APIs
// 3. VALIDATION FOR POST AND DELETE METHODS

app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const student = studentService.getStudentById(studentId);

  // check if id exists
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.post("/students", (req, res) => {
  const errors = [];

  // check if first name and last name are present in request body
  if (!req.body.first_name) {
    errors.push("First name is required");
  }

  if (!req.body.last_name) {
    errors.push("Last name is required");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors: errors });
  } else {
    let newStudent = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };

    newStudent = studentService.addStudent(newStudent);
    res.json(newStudent);
  }
});

app.delete("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const deletedStudent = studentService.deleteStudentById(studentId);

  // check if id exists
  if (deletedStudent) {
    res.json(deletedStudent);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

module.exports = app;
