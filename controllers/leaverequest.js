const LeaveRequest = require("../models/leaverequest");
const postLeaveRequest = async (req, res) => {
  try {
    const { start_date, end_date, message } = req.body;
    const { emp_id } = req.params;
    console.log(start_date, end_date, message, "hello");

    const LeaveRequestModal = new LeaveRequest(
      emp_id,
      start_date,
      end_date,
      emp_id,
      message
    );
    console.log("hello");
    const Requested = await LeaveRequestModal.create(emp_id);
    console.log("hello");
    return res.status(200).json({
      Requested: Requested[0],
      msg: "apply for leave request sucessfully",
    });
  } catch (error) {
    return res.status(400).json({ msg: "cann't post leave request" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(req.body);
    const { emp_id } = req.params;
    console.log(emp_id, status);

    const leaveRequest = new LeaveRequest(emp_id, null, null, null);
    await leaveRequest.updateStatus(status);
    return res.status(200).json({ msg: "update successful" });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "cannot change status of leave request" });
  }
};

const getLeaveRequest = async (req, res) => {
  try {
    const getRequest = await LeaveRequest.findAll();

    return res.status(200).json(getRequest[0]);
  } catch (error) {
    return res.status(400).json({ msg: "cann't fetch the data" });
  }
};
const getSignleLeaveRequest = async (req, res) => {
  try {
    const { emp_id } = req.params;
    console.log(emp_id);
    const getSingleId = new LeaveRequest();
    const getRequest = await getSingleId.findById(emp_id);
    return res.status(200).json(getRequest[0]);
  } catch (error) {
    return res.status(400).json({ msg: "cann't fetch the data" });
  }
};
const deleteRequest = async (req, res) => {
  try {
    const { emp_id } = req.params;
    console.log(emp_id);
    const deleteId = new LeaveRequest(emp_id);
    const getRequest = await deleteId.deleteRequest(emp_id);
    return res.status(200).json(getRequest[0]);
  } catch (error) {
    return res.status(400).json({ msg: "cann't fetch the data" });
  }
};

module.exports = {
  postLeaveRequest,
  updateStatus,
  getLeaveRequest,
  getSignleLeaveRequest,
  deleteRequest,
};
