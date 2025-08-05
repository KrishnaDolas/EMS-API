import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addEmployee,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId } from '../Controllers/EmployeeController.js'

const router =  express.Router()

router.get('/', AuthMiddleware,getEmployees)
router.post('/add', AuthMiddleware,addEmployee)
router.get('/:id', AuthMiddleware,getEmployee)
router.put('/:id', AuthMiddleware,updateEmployee)
router.get('/department/:id', AuthMiddleware,fetchEmployeesByDepId)

export default router