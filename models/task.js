const db = require("../db/connect");

class Employee {
  constructor(employeeData) {
    this.emp_id = employeeData.emp_id;
    this.emp_name = employeeData.emp_name;
    this.task_priority = employeeData.task_priority;
    this.task_title = employeeData.task_title;
    this.task_description = employeeData.task_description;
    this.task_end_date = employeeData.task_end_date;
    this.emp_final_remark = employeeData.emp_final_remark;
    this.task_assign_date = employeeData.task_assign_date;
    this.status = employeeData.status;
    this.task_complete = employeeData.task_complete;
    this.issues = employeeData.issues;
    this.resources = employeeData.resources;
  }

  async create() {
    // const selectSql = "SELECT * FROM task WHERE emp_id = ? LIMIT 1";
    // const selectValues = [this.emp_id];

    // try {
    //   const [rows] = await db.execute(selectSql, selectValues);
    //   if (rows.length > 0 && rows[0].status !== "completed") {
    //     throw new Error("Employee already has an ongoing task.");
    //   }
    try {
      const createSql =
        "INSERT INTO task (emp_id, emp_name, task_priority, task_title, task_description, task_end_date, task_assign_date, status) VALUES (?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'), 'pending')";
      const currentDate = new Date().toISOString().slice(0, 10);
      const values = [
        this.emp_id,
        this.emp_name,
        this.task_priority,
        this.task_title,
        this.task_description,
        this.task_end_date,
        currentDate,
      ];
      return await db.execute(createSql, values);
    } catch (error) {
      throw error;
    }
  }

  static findAll() {
    console.log("getting data");
    let selectSql = `SELECT * from employee e join task t on e.emp_id=t.emp_id`;
    return db.execute(selectSql);
  }

  findById(emp_id) {
    const createSql = "SELECT * FROM task where emp_id = ?";
    const values = [emp_id];
    return db.execute(createSql, values);
  }
  findBytaskId(task_id) {
    const createSql = "SELECT * FROM task where task_id = ?";
    const values = [task_id];
    return db.execute(createSql, values);
  }

  deleteEmployee(emp_id) {
    const createSql = "DELETE FROM task where task_id = ?";
    const values = [emp_id];
    return db.execute(createSql, values);
  }

  async updateEmp(task_id) {
    const updateSql = `UPDATE task SET status=?  WHERE task_id=?`;
    const values = [this.status, task_id];
    console.log(values);

    const taskHistorySql = `
    INSERT INTO task_history (task_id, emp_final_remark, status, task_complete, time,issues,resources)
    VALUES (?, ?, ?, ?, NOW(),?,?)`;
    const taskHistoryValues = [
      task_id,
      this.emp_final_remark,
      this.status,
      this.task_complete,
      this.issues,
      this.resources,
    ];

    try {
      // Update the task table
      await db.execute(updateSql, values);

      // Insert into the task_history table
      await db.execute(taskHistorySql, taskHistoryValues);

      // Return a success message or desired response
      return "Task updated and task history recorded successfully.";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateContact(task_id) {
    let updateSql = `
    UPDATE task 
    SET emp_name = ?, task_priority = ?, task_title = ?, task_description = ?, task_end_date = ?
    WHERE task_id = ?`;

    const values = [
      this.emp_name,
      this.task_priority,
      this.task_title,
      this.task_description,
      this.task_end_date,
      task_id,
    ];

    return db.execute(updateSql, values);
  }
}

module.exports = Employee;
