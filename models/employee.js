const db = require("../db/connect");
class Employee {
  constructor(employeeData) {
    this.dept_id = employeeData.dept_id;
    this.salary = employeeData.salary;
    this.position = employeeData.position;
    this.gender = employeeData.gender;
    this.first_name = employeeData.first_name;
    this.middle_name = employeeData.middle_name;
    this.last_name = employeeData.last_name;
    this.dept_name = employeeData.dept_name;
    this.image = employeeData.image;
  }

  create() {
    const createSql =
      "INSERT INTO employee (dept_id, salary, position, gender, first_name, middle_name, last_name, dept_name,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
    const values = [
      this.dept_id,
      this.salary,
      this.position,
      this.gender,
      this.first_name,
      this.middle_name,
      this.last_name,
      this.dept_name,
      this.image,
    ];
    console.log(values);

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
    let createSql = `
    UPDATE employee 
    SET dept_id = ?, salary = ?, position = ?, gender = ?, 
    first_name = ?, middle_name = ?, last_name = ?, dept_name = ?`;

    const values = [
      this.dept_id,
      this.salary,
      this.position,
      this.gender,
      this.first_name,
      this.middle_name,
      this.last_name,
      this.dept_name,
    ];

    // Check if the image value is provided
    if (this.image) {
      createSql += ", image = ?";
      values.push(this.image);
    }

    createSql += " WHERE emp_id = ?";
    values.push(emp_id);

    return db.execute(createSql, values);
  }
}

module.exports = Employee;
