import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
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

export const getSingleDoctor = async (req, res) => {
  const userId = req.params.id;

  try {
    const doctor = await Doctor.findById(userId, { password: 0 });

    if (doctor) {
      res.status(200).json({
        success: true,
        message: "Doctor Found",
        data: doctor,
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

export const getAllDoctor = async (req, res) => {
  try {

    const { query } = req.query;

    let doctors;

    if (query) {
      doctors = await Doctor.find(
        {
          isApproved: "approved",
          $or: [
            { name: { $regex: query, $options: "i" } },
            { specialization: { $regex: query, $options: "i" } },
          ],
        },
        { password: 0 }
      );
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }, { password: 0 });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Found",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};
