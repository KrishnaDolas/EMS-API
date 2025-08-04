import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addSalary,getSalary } from '../Controllers/SalaryController.js'



const router =  express.Router()

router.post('/add', AuthMiddleware,addSalary)
router.get('/:id', AuthMiddleware,getSalary)

export default router