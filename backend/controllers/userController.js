const User = require("../models/userModels");

const getUserController = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user) {
      user.password = undefined;
      res.status(200).send({
        success: true,
        user,
      });
    } else {
      next("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      next("Please provide name for updation");
    } else {
      const user = await User.findByIdAndUpdate(req.user.userId, {
        $set: { name: name },
      });
      res.status(200).send({
        success: true,
        message: "Name updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
const deleteUserController = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.user.userId);
    if (result) {
      res.status(200).send({
        success: true,
        message: "user deleted successfully",
      });
    } else {
      next("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserController, updateUserController,deleteUserController };
