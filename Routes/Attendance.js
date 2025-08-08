import express from 'express';
import {getAttendace} from '../Controllers/attendaceController.js';
import defaultAttendance from '../Middleware/defaultAttendance.js'

const router = express.Router();


router.get('/',defaultAttendance, getAttendace);

    
export default router;