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

  static async login(email, password) {
    try {
      const [rows] = await this.findByEmail(email);
      if (!rows || rows.length === 0) {
        return null;
      }

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password); // Compare the passwords
      if (!match) {
        return null;
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = User;
