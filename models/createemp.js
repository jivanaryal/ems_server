const db = require("../db/connect");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

class User {
  constructor(emp_id, userName, password, newpassword) {
    this.emp_id = emp_id;
    this.userName = userName;
    this.password = password;
    this.newpassword = newpassword;
  }
  create() {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt); // Hash the password
    const createSql =
      "INSERT INTO employee_login(userName, password,emp_id) VALUES (?,?,?)";
    const values = [this.userName, hashedPassword, this.emp_id]; // Use the hashed password
    console.log(values);
    return db.execute(createSql, values);
  }
  async exists() {
    const query = "SELECT password FROM employee_login WHERE emp_id = ?";
    const [rows] = await db.execute(query, [this.emp_id]);

    if (rows.length === 0) {
      return false; // User with emp_id not found in the database
    }

    const hashedPasswordInDB = rows[0].password;
    const isPasswordMatch = await bcrypt.compare(
      this.password,
      hashedPasswordInDB
    );
    return isPasswordMatch;
  }

  async changePassword(hashedNewPassword) {
    const updateSql = "UPDATE employee_login SET password = ? WHERE emp_id = ?";
    const values = [hashedNewPassword, this.emp_id];
    await db.execute(updateSql, values);
  }

  static findAll() {
    let selectSql = `SELECT * from employee_login`;
    return db.execute(selectSql);
  }

  static async findByEmail(userName) {
    const findSql = "SELECT * FROM employee_login WHERE userName = ?";
    return db.execute(findSql, [userName]); // Add return statement
  }

  async checkUserExist(emp_id) {
    try {
      const [result] = await db.execute(
        "SELECT * FROM ems.employee_login WHERE userName = ?",
        [emp_id]
      );
      return result.length > 0; // If result.length > 0, emp_id already exists
    } catch (error) {
      throw error;
    }
  }

  // Inside the User module
  static async login(userName, password) {
    try {
      const [rows] = await this.findByEmail(userName);
      if (!rows || rows.length === 0) {
        // User with the given email not found
        return { error: "userName_NOT_FOUND" };
        console.log(userName, password, "hello ji");
      }

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password); // Compare the passwords
      if (!match) {
        // Incorrect password
        return { error: "INVALID_PASSWORD" };
      }

      return { user }; // Return the user object
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = User;
