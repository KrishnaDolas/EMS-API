import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    date : {
        type : String, //format yy-mm-dd
        required : true
    },
    employeeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Employee',
        required : true
    },
    status : {
         type : String,
        enum : ['Present','Absent','Sick','Leave'],
        default : null
    }
})

export const Attendance = mongoose.model('Attendance',AttendanceSchema)

