import { populate } from "dotenv";
import Attendance from "../Modules/Attendance.js";


const getAttendace = async (req,res) => {

    try {
        
        const date = new Date ().toISOString().split('T')[0];
        const attendace = await Attendance.find({date}).populate({
            path : 'employeeId',
            populate : [
                'department',
                'userId'
            ]
        })
                 res.status(200).json ({success : true, attendace})

    } catch (error) {
         res.status(500).json ({success : false, message : error.message})
    }


}

export default getAttendace;