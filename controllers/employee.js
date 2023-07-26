const Employee = require("../models/employee");

const postData = async (req, res) => {
  try {
    const {
      salary,
      position,
      gender,
      first_name,
      middle_name,
      last_name,
      dept_name,
    } = req.body;
    const files = req.files;
    const imagePaths = files.map((file) => file.path);

    const image = imagePaths[0];
    console.log(image, "hello");

    console.log(dept_name, "hello");
    const { id } = req.params;
    const dept_id = id;
    const employeeData = {
      dept_id,
      salary,
      position,
      gender,
      first_name,
      middle_name,
      last_name,
      dept_name,
      image,
    };
    const employeeModal = new Employee(employeeData);
    const createRecord = await employeeModal.create();
    return res.status(200).json({
      createRecord,
      msg: "Employee Created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getData = async (req, res) => {
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

    if (!deleteRecord) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No department found with the specified ID.",
      });
    }

    return res.status(200).json({
      deleteRecord,
      msg: "Record Deleted successfully",
    });
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        error: "Conflict",
        msg: "Cannot delete the department as it is referenced by employee records.",
      });
    } else {
      console.log(error);
      return res.status(500).json({
        error: "Internal Server Error",
        msg: error.message,
      });
    }
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;

  const emp_id = id;
  console.log(emp_id);

  try {
    const {
      dept_id,
      salary,
      position,
      gender,
      first_name,
      middle_name,
      last_name,
      dept_name,
    } = req.body;
    const files = req.files;
    const imagePaths = files.map((file) => file.path);

    const image = imagePaths[0];
    console.log(image, "hello");

    console.log(
      dept_id,
      salary,
      position,
      gender,
      first_name,
      middle_name,
      last_name,
      dept_name,
      emp_id,
      "hello"
    );
    const employeeData = {
      dept_id,
      salary,
      position,
      gender,
      first_name,
      middle_name,
      last_name,
      dept_name,
      image,
    };

    const EmployeeModel = new Employee(employeeData);
    const updateRecord = await EmployeeModel.updateContact(emp_id);
    return res.status(200).json(updateRecord[0]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData,
  postData,
  getSingleData,
  deleteData,
  updateData,
};
