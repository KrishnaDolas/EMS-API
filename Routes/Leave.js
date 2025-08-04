import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addLeave,getLeave,getLeaves,getLeaveDetail,updateLeave } from '../Controllers/LeaveController.js'


const router = express.Router()

router.post('/add', AuthMiddleware, addLeave)
router.get('/:id', AuthMiddleware, getLeave)
router.get('/detail/:id', AuthMiddleware, getLeaveDetail)
router.get('/', AuthMiddleware, getLeaves)
router.put('/:id', AuthMiddleware, updateLeave)

export default router