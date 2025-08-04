import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addDepartment,getDepartments,getDepartment,updateDepartment,deleteDepartment } from '../Controllers/departmentController.js'

const router =  express.Router()

router.get('/', AuthMiddleware,getDepartments)
router.post('/add', AuthMiddleware,addDepartment)
router.get('/:id', AuthMiddleware,getDepartment)
router.put('/:id', AuthMiddleware,updateDepartment)
router.delete('/:id', AuthMiddleware,deleteDepartment)

export default router