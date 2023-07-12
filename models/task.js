const db = require("../db/connect");
class Employee {
  constructor(employeeData) {
    this.emp_id = employeeData.emp_id;
    this.emp_name = employeeData.emp_name;
    this.task_priority = employeeData.task_priority;
    this.task_title = employeeData.task_title;
    this.task_description = employeeData.task_description;
    this.task_end_date = employeeData.task_end_date;
  }

  create() {
    const createSql =
      "INSERT INTO task (emp_id, emp_name, task_priority, task_title, task_description, task_end_date, task_assign_date,status,task_complete) VALUES (?, ?, ?, ?, ?, ?, CURDATE(),'pending',0)";
    const values = [
      this.emp_id,
      this.emp_name,
      this.task_priority,
      this.task_title,
      this.task_description,
      this.task_end_date,
    ];

    return db.execute(createSql, values);
  }
  static findAll() {
    console.log("getting data");
    let selectSql = `SELECT * FROM employee`;
    return db.execute(selectSql);
  }

  findById(emp_id) {
    const createSql = "SELECT * FROM task where emp_id = ?";
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
    SET dept_id = ?, salary = ?, job = ?, gender = ?, 
    first_name = ?, middle_name = ?, last_name = ?, dept_name = ?`;

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
