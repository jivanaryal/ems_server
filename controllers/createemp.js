const User = require("../models/createemp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxTime = 3 * 24 * 60 * 60;

const createJwtToken = (id) => {
  return jwt.sign({ id }, "jivan aryal is introvert", {
    expiresIn: maxTime,
  });
};

const LoginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password, "email and password");
  try {
    const result = await User.login(email, password);

    if (result.error === "EMAIL_NOT_FOUND") {
      return res.status(401).json({ message: "Email not registered" });
    }

    if (result.error === "INVALID_PASSWORD") {
      return res.status(401).json({ message: "Invalid password" });
    }

    const user = result.user;
    const token = createJwtToken(user.id);
    console.log(user.emp_id, "hello");

    res.cookie("jwt", token, {
      httpOnly: false,
    });
    return res.status(200).json({ emp_id: user.emp_id, token, loggedIn: true });
  } catch (error) {
    console.log(error);
    // Handle other unexpected errors if necessary
    return res.status(500).json({ message: "Internal server error" });
  }
};

const RegisterUser = async (req, res) => {
  const { id } = req.params;
  const emp_id = id;
  const { email, password } = req.body;

  try {
    // If emp_id doesn't exist, proceed with user registration
    const userModel = new User(emp_id, email, password);
    // Check if emp_id already exists in the database
    const existingUser = await userModel.checkUserExist(emp_id);
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Employee has already registered." });
    }

    const [users] = await userModel.create();

    const userId = users.insertId;
    console.log(userId);

    const token = createJwtToken(userId);
    console.log(token);
    res.cookie("jwt", token, {
      httpOnly: false,
    });
    return res.status(200).json({ users: userId, created: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const { emp_id } = req.params;

    // Validate the new password (optional)
    // Add any necessary validation logic here

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedNewPassword = bcrypt.hashSync(new_password, salt);

    // Check if the old password is correct
    const changePasswordModal = new User(
      emp_id,
      null,
      old_password,
      new_password
    );
    const isOldPasswordCorrect = await changePasswordModal.exists();
    if (isOldPasswordCorrect) {
      // Update the user's password in the database
      await changePasswordModal.changePassword(hashedNewPassword);
      res.status(200).json({ message: "Password changed successfully." });
    } else {
      res.status(400).json({ error: "Your Old Password is incorrect." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const CheckUser = (req, res) => {
  res.send("hello i am from checkuser");
};

module.exports = {
  RegisterUser,
  LoginUser,
  CheckUser,
  ChangePassword,
};
