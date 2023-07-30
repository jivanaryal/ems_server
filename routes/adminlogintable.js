const Router = require("express");
const {
  RegisterUser,
  LoginUser,
  getNewUsers,
  CheckUser,
  ChangePassword,
} = require("../controllers/adminlogintable");

const router = Router();

router.route("/admin/signup").post(RegisterUser).get(getNewUsers);
router.route("/admin/login").post(LoginUser);
router.route("/changepw/:admin_id").post(ChangePassword);
router.route("/").get(CheckUser);

module.exports = router;
