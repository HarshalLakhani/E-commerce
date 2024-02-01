const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})
const user = mongoose.model("user", UserSchema)
module.exports = user