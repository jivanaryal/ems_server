const Router = require("express");
const {
  getData,
  postData,
  getSingleData,
  deleteData,
  updateData,
} = require("../controllers/employee");
const multer = require("multer");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/").get(getData);

router.post("/:id", upload.any("file"), postData);
router.route("/:id").get(getSingleData).delete(deleteData);
router.patch("/:id", upload.any("file"), updateData);

module.exports = router;
