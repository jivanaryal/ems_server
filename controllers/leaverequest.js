const { end } = require("../db/connect");
const LeaveRequest = require("../models/leaverequest");
const postLeaveRequest = async (req, res) => {
  try {
    const { start_date, end_date, message } = req.body;
    const { emp_id } = req.params;

    const LeaveRequestModal = new LeaveRequest(
      emp_id,
      start_date,
      end_date,
      message
    );

    // This is where we catch the error if there is a pending request.
    try {
      const requested = await LeaveRequestModal.create();
      return res.status(200).json({
        Requested: requested[0],
        msg: "Applied for leave request successfully",
      });
    } catch (error) {
      return res.status(409).json({ msg: error.message });
    }
  } catch (error) {
    return res.status(400).json({ msg: "Cannot post leave request" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(req.body);
    const { emp_id } = req.params;
    const leave_id = emp_id;
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
const updateLeaveRequest = async (req, res) => {
  try {
    const { start_date, end_date, message } = req.body;

    const { leave_id } = req.params;

    const leaveRequest = new LeaveRequest(null, start_date, end_date, message);

    console.log(start_date, end_date, message);
    const getRequest = await leaveRequest.updateLeaveRequest(leave_id);
    return res.status(200).json(getRequest[0]);
  } catch (error) {
    return res.status(400).json({ msg: "cannot update the leave request" });
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
    const { leave_id } = req.params;
    console.log(leave_id);
    const deleteId = new LeaveRequest(leave_id);
    const getRequest = await deleteId.deleteRequest(leave_id);
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
  updateLeaveRequest,
};
