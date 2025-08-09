import { Attendance } from "../Modules/Attendance.js";
import Employee from "../Modules/Employee.js";

const defaultAttendance = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0];

        // Check if attendance already exists for this date
        const existingAttendance = await Attendance.findOne({ date });

        if (!existingAttendance) {
            const employees = await Employee.find({});
            const attendanceData = employees.map(employee => ({
                date,
                employeeId: employee._id,
                status: null
            }));

            await Attendance.insertMany(attendanceData);
        }

        next();
    } catch (error) {
        console.error("Default Attendance Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack,
            error: error
        });
    }
};

export default defaultAttendance;
