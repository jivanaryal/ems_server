const User = require("../models/adminlogintable");
const jwt = require("jsonwebtoken");

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
    const user = await User.login(email, password);

    if (user.error === "EMAIL_NOT_FOUND") {
      return res.status(401).json({ message: "Email not registered" });
    }

    if (user.error === "INVALID_PASSWORD") {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createJwtToken(user.id);
    console.log(user, "hello");

    res.cookie("jwt", token, {
      httpOnly: false,
    });
    return res.status(200).json({ token, loggedIn: true });
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
};
