const {Router} = require("express")
const { signupui ,signup,loginui,login,forgetpass,resetpass,verify} = require("../controller/user.controll")
const Auth = require("../middlewear/isauth")


const userut = Router()

userut.get("/signup",signupui)
userut.post("/signup",signup)

userut.get("/login",loginui)
userut.post("/login",Auth,login)
// userut.get("/forgot-password",forgetpass)

userut.get("/sendmail",forgetpass)
userut.post("/sendmail",resetpass)
userut.get("/verify/:otp",verify)


module.exports = userut