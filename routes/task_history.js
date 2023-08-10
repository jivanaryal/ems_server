const Router = require("express");
const { getData, getSingleData } = require("../controllers/task_history");
const router = Router();

router.route("/:task_id").get(getData);
router.route("/single/:th_id").get(getSingleData);

module.exports = router;
