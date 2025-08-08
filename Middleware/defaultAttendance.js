import Attendance from "../Modules/Attendance.js";
import Employee from '../Modules/Employee.js'


const defaultAttendance = async (req,res,next) => {

    try {
        const date = new Date ().toISOString().split('T')[0];
        const existingAttendance = await Attendance.findone({date});

        if(!existingAttendance){
            const employees = await Employee.find({});
            const attendace = employees.map ( employee => ({date, employeeId : employee._id, status : null}));

            await Attendance.insertMany(attendace);
        }
        next();

    } catch (error) {
        res.status(500).json ({success : false,error : error})
    }

}

export default defaultAttendance;