const db = require("../db/connect");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  create() {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt); // Hash the password
    const createSql =
      "INSERT INTO adminlogintable(email, password) VALUES (?, ?)";
    const values = [this.email, hashedPassword]; // Use the hashed password
    return db.execute(createSql, values);
  }

  static findAll() {
    let selectSql = `SELECT * from newuser`;
    return db.execute(selectSql);
  }

  static async findByEmail(email) {
    const findSql = "SELECT * FROM adminlogintable WHERE email = ?";
    return db.execute(findSql, [email]); // Add return statement
  }

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