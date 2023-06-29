const Router = require("express");
const {
  getData,
  postData,
  getSingleData,
  deleteData,
  updateData,
} = require("../controllers/department");
const router = Router();

router.route("/").get(getData).post(postData);
router.route("/:id").get(getSingleData).delete(deleteData).patch(updateData);

module.exports = router;