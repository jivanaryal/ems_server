const Router = require("express");
const {
  getData,
  postData,
  getSingleData,
  deleteData,
  updateData,
  updateEmpData,
  getSingletaskData,
} = require("../controllers/task");

const router = Router();

router.route("/:id").get(getSingleData);
router.route("/single/:id").get(getSingletaskData);
router.route("/").get(getData);

router.route("/:id").post(postData);
router.route("/cms/:task_id").patch(updateData);
router.route("/emp/:task_id").patch(updateEmpData);
router.route("/:id").delete(deleteData);

module.exports = router;
