import {Attendance} from "../Modules/Attendance.js";

const getAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.find({ date: today })
      .populate({
        path: 'employeeId',
        populate: [
          { path: 'department' },
          { path: 'userId' }
        ]
      });

    console.log("Attendance result:", JSON.stringify(attendance, null, 2));

    res.status(200).json({ success: true, attendance });
  } catch (error) {
  console.error("Backend error:", error);

  res.status(500).json({
    success: false,
    message: error?.message || "Unknown server error",
    stack: error?.stack || null,
    error: JSON.parse(JSON.stringify(error)) // makes Mongoose errors serializable
  });
}

};


export default getAttendance;
