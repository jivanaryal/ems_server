const db = require("../db/connect");

class Department {
  constructor(dept_name, dept_location) {
    this.dept_name = dept_name;
    this.dept_location = dept_location;
  }

  async exists() {
    const query =
      "SELECT COUNT(*) as count FROM department WHERE dept_name = ?";
    const [rows] = await db.execute(query, [this.dept_name]);
    return rows[0].count > 0;
  }

  async create() {
    if (await this.exists()) {
      throw new Error("Department with the same name already exists.");
    }

    const createSql =
      "INSERT INTO department (dept_name, dept_location) VALUES (?, ?)";
    const values = [this.dept_name, this.dept_location];
    return db.execute(createSql, values);
  }

  async updateDepartment(dept_id) {
    // Check if there is any existing department with the same name and different location

    const updateSql =
      "UPDATE department SET dept_name = ?, dept_location = ? WHERE dept_id = ?";
    const values = [this.dept_name, this.dept_location, dept_id];
    return db.execute(updateSql, values);
  }

  static async findByDeptNameAndDifferentLocation(
    dept_name,
    dept_location,
    dept_id
  ) {
    const createSql =
      "SELECT * FROM department WHERE dept_name = ? , dept_location = ? where dept_id = ?";
    const values = [dept_name, dept_location, dept_id];
    return db.execute(createSql, values);
  }

  static async findAll() {
    let selectSql = `SELECT * FROM department`;
    return db.execute(selectSql);
  }

  async findBydept_id(dept_id) {
    const createSql = "SELECT * FROM department WHERE dept_id = ?";
    const values = [dept_id];
    return db.execute(createSql, values);
  }

  async deleteDepartment(dept_id) {
    const createSql = "DELETE FROM department WHERE dept_id = ?";
    const values = [dept_id];
    return db.execute(createSql, values);
  }

  // Other methods...
}

module.exports = Department;
