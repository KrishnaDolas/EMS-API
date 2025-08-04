import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { changePassword } from '../Controllers/SettingController.js'


const router =  express.Router()

router.put('/change-password', AuthMiddleware, changePassword)

export default router