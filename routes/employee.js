const Router = require("express");
const {
  getData,
  postData,
  getSingleData,
  deleteData,
  updateData,
} = require("../controllers/employee");
const router = Router();

router.route("/").get(getData);
router
  .route("/:id")
  .get(getSingleData)
  .post(postData)
  .delete(deleteData)
  .patch(updateData);

module.exports = router;
