const Router = require("express");
const {
  postLeaveRequest,
  updateStatus,
  getLeaveRequest,
  getSignleLeaveRequest,
  deleteRequest,
  updateLeaveRequest,
} = require("../controllers/leaverequest");
const router = Router();

router.route("/request/:emp_id").post(postLeaveRequest);
router.route("/request/:leave_id").delete(deleteRequest);
router.route("/approve/:emp_id").patch(updateStatus).get(getSignleLeaveRequest);
router.route("/approve/emp/:leave_id").patch(updateLeaveRequest);
router.route("/").get(getLeaveRequest);

module.exports = router;
