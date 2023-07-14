const Employee = require("../models/task");

const postData = async (req, res) => {
  const { id } = req.params;
  const emp_id = id;
  console.log(req.body);
  try {
    const {
      emp_name,
      task_priority,
      task_title,
      task_description,
      task_end_date,
    } = req.body;

    const employeeData = {
      emp_id,
      emp_name,
      task_priority,
      task_title,
      task_description,
      task_end_date,
    };
    const employeeModal = new Employee(employeeData);
    const createRecord = await employeeModal.create();
    console.log("hello");
    return res.status(200).json({
      createRecord,
      msg: "Employee Created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const getData = async (req, res) => {
  const { emp_id } = req.params;
  console.log("testing get");
  try {
    const EmployeeModal = await Employee.findAll();
    return res.status(200).json(EmployeeModal[0]);
  } catch (error) {
    return res.status(400).json({ msg: "cann't fetch the data" });
  }
};
const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const EmployeeModel = new Employee(id);
    const getSingleRecord = await EmployeeModel.findById(id);

    return res.status(200).json(getSingleRecord[0]);
  } catch (error) {
    console.log(error);
  }
};
const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const EmployeeModel = new Employee(id);
    const deleteRecord = await EmployeeModel.deleteEmployee(id);
    return res.status(200).json(deleteRecord[0]);
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  const { task_id } = req.params;
  console.log(task_id);

  try {
    const {
      emp_final_remark,
      task_complete,
      status,
      emp_id,
      emp_name,
      task_priority,
      task_title,
      task_description,
      task_end_date,
      task_assign_date,
    } = req.body;

    const employeeData = {
      emp_final_remark,
      task_complete,
      status,
      task_id,
      emp_id,
      emp_name,
      task_priority,
      task_title,
      task_assign_date,
      task_description,
      task_end_date,
    };
    console.log(employeeData);

    const EmployeeModel = new Employee(employeeData);
    const updateRecord = await EmployeeModel.updateContact(task_id);
    return res.status(200).json(updateRecord[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getData,
  postData,
  getSingleData,
  deleteData,
  updateData,
};
