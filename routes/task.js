const Router = require("express");
const {
  getData,
  postData,
  getSingleData,
  deleteData,
  updateData,
} = require("../controllers/task");

const router = Router();

router.route("/:id").get(getSingleData);
router.route("/").get(getData);

router.route("/:id").post(postData);
router.route("/:task_id").patch(updateData);
router.route("/:id").delete(deleteData);
// router.post("/:id", upload.any("file"), postData);
// router.patch("/:id", upload.any("file"), updateData);

module.exports = router;
