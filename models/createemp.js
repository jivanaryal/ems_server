const db = require("../db/connect");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

class User {
  constructor(emp_id, email, password) {
    this.emp_id = emp_id;
    this.email = email;
    this.password = password;
  }
  create() {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt); // Hash the password
    const createSql =
      "INSERT INTO logintable(email, password,emp_id) VALUES (?,?,?)";
    const values = [this.email, hashedPassword, this.emp_id]; // Use the hashed password
    console.log(values);
    return db.execute(createSql, values);
  }

  static findAll() {
    let selectSql = `SELECT * from logintable`;
    return db.execute(selectSql);
  }

  static async findByEmail(email) {
    const findSql = "SELECT * FROM logintable WHERE email = ?";
    return db.execute(findSql, [email]); // Add return statement
  }

  async checkUserExist(emp_id) {
    try {
      const [result] = await db.execute(
        "SELECT * FROM ems.logintable WHERE emp_id = ?",
        [emp_id]
      );
      return result.length > 0; // If result.length > 0, emp_id already exists
    } catch (error) {
      throw error;
    }
  }

  // Inside the User module
  static async login(email, password) {
    try {
      const [rows] = await this.findByEmail(email);
      if (!rows || rows.length === 0) {
        // User with the given email not found
        return { error: "EMAIL_NOT_FOUND" };
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
