const db = require("../db/connect");
class Department {
  constructor(dept_name, dept_location) {
    this.dept_name = dept_name;
    this.dept_location = dept_location;
  }

  static findAll(task_id) {
    let selectSql = `SELECT * FROM task_history where task_id = ?`;
    let values = [task_id];
    return db.execute(selectSql, values);
  }
}

module.exports = Department;
