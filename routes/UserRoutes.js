const express = require("express")
const router = express.Router()

//controller
const {
    register, 
    login,
    getCurrentUser, 
    update,
    getUserById,
    forgotPassword, 
    resetPassword
} = require("../controllers/UserController")

//middlewares
const validate = require("../middlewares/handleValidation")
const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/userValidation")
const authGuard = require("../middlewares/authGuard")
const { imageUpload } = require("../middlewares/imageUpload")

//routes
router.post("/request", forgotPassword)
router.post("/reseta", resetPassword)
router.get("/details", getUserById)
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)
router.put("/update", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update)

module.exports = router