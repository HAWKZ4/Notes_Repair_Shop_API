const User = require("../models/User");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
};

// @desc Create a user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { username, password, roles } = req.body;

  // Confirm data
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { username, password: hashedPwd }
      : { username, password: hashedPwd, roles };

  // Create and store a new user
  const user = await User.create(userObject);

  if (user) {
    // Created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: `Invalid user data received` });
  }
};

// @desc update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const { id, username, password, roles, active } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  // Allow update to the original user
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
};

// @desc delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const note = await Note.findOne({ user: id }).lean().exec();

  if (note) {
    return res.status(400).json({ message: "User has assigned note" });
  }

  const user = await User.findById(id).exec();

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
