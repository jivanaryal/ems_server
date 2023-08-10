const db = require("../db/connect");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

class User {
  constructor(admin_id, email, password, new_password) {
    (this.admin_id = admin_id), (this.email = email);
    this.password = password;
    this.new_password = new_password;
  }
  create() {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt); // Hash the password
    const createSql = "INSERT INTO admin_login(email, password) VALUES (?, ?)";
    const values = [this.email, hashedPassword]; // Use the hashed password
    return db.execute(createSql, values);
  }

  async exists() {
    const query = "SELECT password FROM admin_login WHERE admin_id = ?";
    const [rows] = await db.execute(query, [this.admin_id]);

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
    const updateSql = "UPDATE admin_login SET password = ? WHERE admin_id = ?";
    const values = [hashedNewPassword, this.admin_id];
    await db.execute(updateSql, values);
  }

  static findAll() {
    let selectSql = `SELECT * from newuser`;
    return db.execute(selectSql);
  }

  static async findByEmail(email) {
    const findSql = "SELECT * FROM admin_login WHERE email = ?";
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
