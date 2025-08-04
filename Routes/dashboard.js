import express from 'express'
import authMiddleware from '../Middleware/AuthMiddleware.js'
import { getSummary } from '../Controllers/dashboardController.js'

const router = express.Router()

router.get('/summary', authMiddleware, getSummary)

export default router;