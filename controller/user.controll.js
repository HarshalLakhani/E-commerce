const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const otpGenerator = require('otp-generator')
const user = require("../models/user.model")

const signupui = (req, res) => {
    res.render("signup")
}
const signup = async (req, res) => {
    let { name, email, password , role } = req.body
    let data = await user.findOne({ email: email })


    try {
        if (data) {
            // res.send("already create account. login please.")
            res.redirect("/user/login")
        }
        else {
            bcrypt.hash(password, 7, async (err, hash) => {
                if (err) {
                    res.send(err)
                }
                else {
                    let data = await user.create({ name: name, email: email, password: hash , role:role})
                    res.send({ message: "user created", data: data })
                }
            });
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loginui = (req, res) => {
    res.render("login")
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let data = await user.findOne({ email });
    if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ id: data._id }, "token");
                res.cookie("token", token);
                res.redirect("/product/pro");
            } else {
                res.send({ msg: "Password incorrect" });
            }
        });
    } else {
        res.send({ msg: "User not found" });
    }
};


const forgetpass = (req, res) => {
    res.render("forgotpass")
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lakhaniharshal105@gmail.com',
        pass: 'tybqsiitvndamnhr'
    }
})

let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });


const resetpass = (req, res) => {
    let { email } = req.body
    const mailoption = {
        from: "lakhaniharshal105@gmail.com",
        to: email,
        subject: "reset password",
        html: `<a href="http://localhost:9000/user/verify?otp=${otp}">Click here to reset your password</a>`
    }
    transporter.sendMail(mailoption, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(info)
        }
    })
    res.send("sending otp")
}

const verify = (req, res) => {
    const verifyotp = req.query.otp;

    if (verifyotp == otp) {
        res.send("verifying otp");
    } else {
        res.send("not verifying otp");
    }
}


module.exports = { signupui, signup, loginui, login, forgetpass, resetpass, verify }