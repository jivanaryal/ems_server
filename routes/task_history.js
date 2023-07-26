const Router = require("express");
const { getData } = require("../controllers/task_history");
const router = Router();

router.route("/:task_id").get(getData);

module.exports = router;
