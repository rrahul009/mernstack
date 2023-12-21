// controllers/userController.js
const UserModel = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { name, lastName, email, mobileNo, project } = req.body;

    if (!name || !lastName || !email || !mobileNo || !project) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newUser = new UserModel({
      name,
      lastName,
      email,
      mobileNo,
      project,
    });

    const user = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.allUser = async (req, res) => {
  const user = await UserModel.find({});
  res.status(200).json({
    message: "All registred user",
    user: user,
  });
};
exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Assuming you have a valid MongoDB ObjectId, you can use findById
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data based on the request body
    const { name, lastName, email, mobileNo, project } = req.body;

    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (mobileNo) user.mobileNo = mobileNo;
    if (project) user.project = project;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
 

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

