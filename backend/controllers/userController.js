const jwt = require('jsonwebtoken');
const Users = require('../models/userModel'); 

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await Users.findOne({ email });
    console.log(existingUser);
    if (existingUser === true) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await Users.create({ username, email, password });
    const token  = generateToken(newUser);
      res.cookie('token',token,{
        httpOnly : true,
        sameSite: 'Lax',
        secure: false
      });
    console.log("New user created:", newUser);
    res.status(201).json({message: "User registered successfully"});
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await Users.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token  = generateToken(user);
      res.cookie('token',token,{
        httpOnly : true,
        sameSite: 'Lax',
        secure: false
      });
    res.status(201).json({message: "Login user successfully"});
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerUser, loginUser };