import mongoose, { Mongoose } from 'mongoose'

const AttendanceSchema = new Mongoose.Schema({
    data : {
        type : 'String', //format yy-mm-dd
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

const Attendance = mongoose.model('Attendance',AttendanceSchema)

export default Attendance;