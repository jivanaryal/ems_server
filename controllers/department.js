const Department = require("../models/department");

const postData = async (req, res) => {
  try {
    const { dept_name, dept_location } = req.body;
    const departmentModel = new Department(dept_name, dept_location);

    // Check if a department with the same name already exists
    const departmentExists = await departmentModel.exists();
    if (departmentExists) {
      return res.status(409).json({
        error: "Conflict",
        msg: "Department with the same name already exists.",
      });
    }

    const createRecord = await departmentModel.create();
    return res.status(200).json({
      createRecord,
      msg: "Department created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getData = async (req, res) => {
  try {
    const DepartmentModal = await Department.findAll();
    return res.status(200).json(DepartmentModal[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;
    const DepartmentModel = new Department();
    const getSingleRecord = await DepartmentModel.findBydept_id(id);

    if (getSingleRecord.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No department found with the specified ID.",
      });
    }

    return res.status(200).json(getSingleRecord[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const DepartmentModel = new Department();
    const deleteRecord = await DepartmentModel.deleteDepartment(id);

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

  try {
    const { dept_name, dept_location } = req.body;
    const departmentModel = new Department(dept_name, dept_location);

    // Check if a department with the same name and location already exists

    try {
      // Attempt to update the department
      const updateRecord = await departmentModel.updateDepartment(id);
      return res.status(200).json({
        updateRecord,
        msg: "Department updated successfully",
      });
    } catch (error) {
      if (error.message === "No department found with the specified ID.") {
        return res.status(404).json({
          error: "Not Found",
          msg: "No department found with the specified ID.",
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

module.exports = {
  getData,
  postData,
  getSingleData,
  deleteData,
  updateData,
};
