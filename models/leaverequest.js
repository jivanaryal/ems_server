const db = require("../db/connect");

class LeaveRequest {
  constructor(emp_id, start_date, end_date, message) {
    this.emp_id = emp_id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.message = message;
  }
  async create() {
    const checkPendingRequest =
      "SELECT COUNT(*) as count FROM leaverequest WHERE emp_id = ? AND status = 'pending'";
    const [rows] = await db.execute(checkPendingRequest, [this.emp_id]);

    if (rows[0].count > 0) {
      throw new Error("You already have a pending leave request.");
    }

    // If there is no pending request, proceed to insert the new leave request.
    const insertQuery =
      "INSERT INTO leaverequest (emp_id, start_date, end_date, message, status) VALUES (?, ?, ?, ?, 'pending')";
    const [insertResult] = await db.execute(insertQuery, [
      this.emp_id,
      this.start_date,
      this.end_date,
      this.message,
    ]);

    return insertResult;
  }

  static findAll() {
    const fetchRequest =
      "SELECT * from employee e join leaverequest l on e.emp_id=l.emp_id";
    return db.execute(fetchRequest);
  }

  updateStatus(newStatus) {
    const createSql = "UPDATE leaverequest SET status = ? where leave_id = ?";
    console.log(this.emp_id, newStatus);
    const values = [newStatus, this.emp_id];
    return db.execute(createSql, values);
  }
  updateLeaveRequest(leave_id) {
    console.log(this.message, "hello guys");
    const createSql =
      "UPDATE leaverequest SET start_date = ?, end_date = ?,  message = ? where leave_id = ?";
    console.log(createSql);
    const values = [this.start_date, this.end_date, this.message, leave_id];
    console.log(values);
    return db.execute(createSql, values);
  }

  findById(emp_id) {
    const singleRequest = `SELECT lr.*, e.* FROM leaverequest lr  inner JOIN employee e ON lr.emp_id = e.emp_id WHERE e.emp_id =${emp_id} `;
    return db.execute(singleRequest);
  }
  deleteRequest(leave_id) {
    const createSql = `DELETE FROM leaverequest where leave_id = ${leave_id} AND status = 'pending'`;
    return db.execute(createSql);
  }
}

module.exports = LeaveRequest;
