import express from 'express';
import getAttendance from '../Controllers/attendaceController.js';
import defaultAttendance from '../Middleware/defaultAttendance.js'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'

const router = express.Router();


router.get('/',AuthMiddleware,defaultAttendance, getAttendance);

    
export default router;