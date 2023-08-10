const User = require("../models/adminlogintable");
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
    // console.log(user);

    if (result.error === "EMAIL_NOT_FOUND") {
      return res.status(401).json({ message: "Email not registered" });
    }

    if (result.error === "INVALID_PASSWORD") {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createJwtToken(result.admin_id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: true,
      expires: new Date(Date.now() + maxTime * 1000),
    });

    const user = result.user;

    return res
      .status(200)
      .json({ admin_id: user.admin_id, token, loggedIn: true, jivan: "hello" });
  } catch (error) {
    console.log(error);
    // Handle other unexpected errors if necessary
    return res.status(500).json({ message: "Internal server error" });
  }
};

const RegisterUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userModal = new User(email, password);
    const [users] = await userModal.create();

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
  }
};

const ChangePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const { admin_id } = req.params;
    console.log(old_password, new_password, admin_id);

    // Validate the new password (optional)
    // Add any necessary validation logic here

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedNewPassword = bcrypt.hashSync(new_password, salt);
    console.log(hashedNewPassword);

    // Check if the old password is correct
    const changePasswordModal = new User(
      admin_id,
      null,
      old_password,
      new_password
    );
    const isOldPasswordCorrect = await changePasswordModal.exists();
    console.log(isOldPasswordCorrect);
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

const getNewUsers = async (req, res) => {
  try {
    const contactModal = await User.findAll();
    return res.status(200).json(contactModal[0]);
  } catch (error) {
    console.log(error);
  }
};

const CheckUser = (req, res) => {
  res.send("hello i am from checkuser");
};

module.exports = {
  RegisterUser,
  LoginUser,
  getNewUsers,
  CheckUser,
  ChangePassword,
};
