const db = require("../db/connect");
class Department {
  constructor(dept_name,dept_location) {
    this.dept_name = dept_name;
    this.dept_location = dept_location;
  }
  create() {
    const createSql = "INSERT INTO department (dept_name,dept_location) VALUES (?,?)";
    const values = [this.dept_name,this.dept_location];
    return db.execute(createSql, values);
  }
  static findAll() {
    let selectSql = `SELECT * FROM department`;
    return db.execute(selectSql);
  }

  findBydept_id(dept_id) {
    const createSql = "SELECT * FROM department where dept_id = ?";
    const values = [dept_id];
    return db.execute(createSql, values);
  }

  deleteDepartment(dept_id) {
    const createSql = "DELETE FROM department where dept_id = ?";
    const values = [dept_id];
    return db.execute(createSql, values);
  }

  updateDepartment(dept_id) {
    const createSql = "UPDATE department SET dept_name = ?, dept_location = ? where dept_id = ?";
    const values = [this.dept_name,this.dept_location, dept_id];
    return db.execute(createSql, values);
  }
}

module.exports = Department;