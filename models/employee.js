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
    this.image = employeeData.image;
  }

  create() {
    const createSql =
      "INSERT INTO employee (dept_id, salary, job, gender, first_name, middle_name, last_name, dept_name,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
    const values = [
      this.dept_id,
      this.salary,
      this.job,
      this.gender,
      this.first_name,
      this.middle_name,
      this.last_name,
      this.dept_name,
      this.image,
    ];

    return db.execute(createSql, values);
  }
  static findAll() {
    console.log("getting data");
    let selectSql = `SELECT * FROM employee`;
    return db.execute(selectSql);
  }

  findById(emp_id) {
    const createSql = "SELECT * FROM employee where emp_id = ?";
    const values = [emp_id];
    return db.execute(createSql, values);
  }

  deleteEmployee(emp_id) {
    const createSql = "DELETE FROM employee where emp_id = ?";
    const values = [emp_id];
    return db.execute(createSql, values);
  }

  updateContact(emp_id) {
    // console.log(this.dept_id);
    const createSql = `
    UPDATE employee 
    SET dept_id = ?, salary = ?, job = ?, gender = ?, 
    first_name = ?, middle_name = ?, last_name = ?, dept_name = ?,image=?
    WHERE emp_id = ? `;
    const values = [
      this.dept_id,
      this.salary,
      this.job,
      this.gender,
      this.first_name,
      this.middle_name,
      this.last_name,
      this.dept_name,
      this.image,
      emp_id,
    ];
    return db.execute(createSql, values);
  }
}

module.exports = Employee;
