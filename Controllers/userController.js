import User from "../models/UserSchema.js";

export const updateUser = async (req,res)=>{
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res
          .status(200)
          .json({ success: true, message: "Successfully updated", data: updatedUser });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
          });
    }
}



export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
     await User.findByIdAndDelete(
      id,

    );
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to deleted",
    });
  }
};


export const getSingleUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId, { password: 0 });

    if (user) {
      res.status(200).json({
        success: true,
        message: "User Found",
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No User Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};


