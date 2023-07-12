const Department = require("../models/department");

const postData = async (req, res) => {
  console.log(req.body);
  try {
    const { dept_name, dept_location } = req.body;
    console.log(dept_name, dept_location);
    const DepartmentModal = new Department(dept_name, dept_location);
    const createRecord = await DepartmentModal.create();
    return res.status(200).json({
      createRecord,
      msg: "Department Created successfully",
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
  console.log("testing get");
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
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
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
    const DepartmentModel = new Department(dept_name, dept_location);
    const createRecord = await DepartmentModel.updateDepartment(id);

    if (!createRecord) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No department found with the specified ID.",
      });
    }

    return res.status(200).json({
      createRecord,
      msg: "Department updated successfully",
    });
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
