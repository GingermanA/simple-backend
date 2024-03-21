// mock json data
const students = require("../data/students");

class StudentService {
  constructor() {
    this.students = students;
  }

  getStudentById(id) {
    return this.students.find((student) => student.id == id);
  }

  addStudent(student) {
    const studentWithId = { id: this.students.length + 1, ...student };
    this.students.push(studentWithId);
    return studentWithId;
  }

  deleteStudentById(id) {
    const index = this.students.findIndex((student) => student.id == id);
    if (index >= 0) {
      return this.students.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = StudentService;
