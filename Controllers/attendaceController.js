import {Attendance} from "../Modules/Attendance.js";
import Employee  from '../Modules/Employee.js'

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

export const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;  // "KS1001"
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    // Find employee by code
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    // Ensure attendance exists for today
    let attendance = await Attendance.findOne({ employeeId: employee._id, date });
    if (!attendance) {
      attendance = new Attendance({ employeeId: employee._id, date, status });
      await attendance.save();
    } else {
      attendance.status = status;
      await attendance.save();
    }

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Update attendance error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Build filter
    const filter = {};
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Get attendance data
    const attendanceRecords = await Attendance.find(filter)
      .populate("employeeId", "employeeId name department")
      .sort({ date: -1 });

    // Format the response
    const report = attendanceRecords.map((record) => ({
      employeeId: record.employeeId?.employeeId || "N/A",
      name: record.employeeId?.name || "N/A",
      department: record.employeeId?.department || "N/A",
      date: record.date,
      status: record.status, // present | absent | sick | leave
    }));

    res.status(200).json({
      success: true,
      count: report.length,
      report,
    });
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch report",
    });
  }
};


export default getAttendance;
