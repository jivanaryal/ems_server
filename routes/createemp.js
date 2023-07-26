const Router = require("express");
const {
  RegisterUser,
  LoginUser,
  CheckUser,
} = require("../controllers/createemp");

const router = Router();

router.route("/signup/:id").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/forgetpw").post(LoginUser);
router.route("/").get(CheckUser);

module.exports = router;
