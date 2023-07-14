const Department = require("../models/task_history");

const getData = async (req, res) => {
  const { emp_id } = req.params;
  console.log("testing get");
  try {
    const DepartmentModal = await Department.findAll(emp_id);
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
};
