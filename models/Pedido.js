const mongoose = require("mongoose")
const {Schema} = mongoose

const pedidoSchema = new Schema({
	email: String,
	titulo: String,
	username: String,
	image: String,
	userId: mongoose.ObjectId,
	local: String,
	tipos: Array,
	desc: String,
}, {
	timestamps: true
})

const Pedido = mongoose.model("Pedido", pedidoSchema)

module.exports = Pedido