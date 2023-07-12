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

router.route("/:id").post(postData);

// router.post("/:id", upload.any("file"), postData);
// router.route("/:id").get(getSingleData).delete(deleteData);
// router.patch("/:id", upload.any("file"), updateData);

module.exports = router;
