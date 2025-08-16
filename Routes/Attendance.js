import express from 'express';
import getAttendance, { updateAttendance,getAttendanceReport } from '../Controllers/attendaceController.js';
import defaultAttendance from '../Middleware/defaultAttendance.js'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'

const router = express.Router();


router.get('/',AuthMiddleware,defaultAttendance, getAttendance);
router.put('/update/:employeeId',AuthMiddleware, updateAttendance);
router.get("/report",AuthMiddleware, getAttendanceReport);

    
export default router;