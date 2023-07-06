const Router = require("express");
const {
  postLeaveRequest,
  updateStatus,
  getLeaveRequest,
  getSignleLeaveRequest,
  deleteRequest,
} = require("../controllers/leaverequest");
const router = Router();

router.route("/request/:emp_id").post(postLeaveRequest).delete(deleteRequest);
router.route("/approve/:emp_id").patch(updateStatus).get(getSignleLeaveRequest);
router.route("/").get(getLeaveRequest);

module.exports = router;
