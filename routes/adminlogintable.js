const Router = require("express");
const {
  RegisterUser,
  LoginUser,
  getNewUsers,
  CheckUser,
} = require("../controllers/adminlogintable");

const router = Router();

router.route("/admin/signup").post(RegisterUser).get(getNewUsers);
router.route("/admin/login").post(LoginUser);
router.route("/").get(CheckUser);

module.exports = router;
