const Department = require("../models/task_history");

const getData = async (req, res) => {
  const { task_id } = req.params;
  console.log("testing get");
  try {
    const DepartmentModal = await Department.findAll(task_id);
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
  const { th_id } = req.params;
  console.log("testing get");
  try {
    const DepartmentModal = await Department.findById(th_id);
    return res.status(200).json(DepartmentModal[0]);
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
  getSingleData,
};
