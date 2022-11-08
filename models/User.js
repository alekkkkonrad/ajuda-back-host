const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema(
    {
        nome: String,
        sobrenome: String,
        email: String,
        ano: String,
        tipoSangue: String,
        celular: String,
        local: String,
        senha: String,
        profileImage: String,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User