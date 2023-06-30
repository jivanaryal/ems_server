const db = require("../db/connect");
class Employee {
  constructor(employeeData) {
    this.dept_id = employeeData.dept_id;
    this.salary = employeeData.salary;
    this.job = employeeData.job;
    this.gender = employeeData.gender;
    this.first_name = employeeData.first_name;
    this.middle_name = employeeData.middle_name;
    this.last_name = employeeData.last_name;
    this.dept_name = employeeData.dept_name;
  }

  create() {
    const createSql =
      "INSERT INTO employee (dept_id, salary, job, gender, first_name, middle_name, last_name, dept_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      this.dept_id,
      this.salary,
      this.job,
      this.gender,
      this.first_name,
      this.middle_name,
      this.last_name,
      this.dept_name,
    ];

    return db.execute(createSql, values);
  }
  static findAll() {
    console.log("getting data");
    let selectSql = `SELECT * FROM employee`;
    return db.execute(selectSql);
  }

  findById(dept_id) {
    const createSql = "SELECT * FROM employee where emp_id = ?";
    const values = [dept_id];
    return db.execute(createSql, values);
  }

  deleteContact(dept_id) {
    const createSql = "DELETE FROM employee where dept_id = ?";
    const values = [dept_id];
    return db.execute(createSql, values);
  }

  updateContact(dept_id) {
    const createSql = "UPDATE contact_db SET emp_name = ? where dept_id = ?";
    const values = [this.emp_name, dept_id];
    return db.execute(createSql, values);
  }
}

module.exports = Employee;
