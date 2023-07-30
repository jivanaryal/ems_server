const Router = require("express");
const {
  RegisterUser,
  LoginUser,
  CheckUser,
  ChangePassword,
} = require("../controllers/createemp");

const router = Router();

router.route("/signup/:id").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/changepw/:emp_id").post(ChangePassword);
router.route("/").get(CheckUser);

module.exports = router;
