const express = require("express")
const cookie = require("cookie-parser")
const connect = require("./config/db")

const prorut = require("./routes/product.route")
const userut = require("./routes/user.routes")
app = express()
app.use(express.json())


app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views',(__dirname + "/views"))
app.use(express.static(__dirname + "/public"))
app.use(cookie())

app.use("/user",userut)
app.use("/product",prorut)

app.get("/",(res,req)=>{
    console.log("welcome home")

})

app.listen("9000", () => {
    console.log("server was starting in port 9000");
    connect()
})