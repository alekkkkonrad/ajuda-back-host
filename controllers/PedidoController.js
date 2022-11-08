const Pedido = require("../models/Pedido")
const User = require("../models/User")
const mongoose = require("mongoose")
const mailer = require('../modules/mailer')

// Insert a pedid, with an user related to it
const insertPedido = async(req, res) => {

    const {titulo, local, tipos, desc} = req.body
    
    const reqUser = req.user
    const user = await  User.findById(reqUser._id)

    //create pedido
    const newPedido = await Pedido.create({
        email: user.email,
        titulo,
        username: user.nome,
        image: user.profileImage,
        userId: user._id,
        local,
        tipos,
        desc,
    })
    //if pedido was created
    if(!newPedido){
        res.status(422).json({
            errors: ["Houve um problema tente novamente mais tarde"]
        })
        return
    }
    res.status(201).json(newPedido)
} 

//remove pedido
const deletePedido = async(req, res) => {
    const {id} = req.params
    const reqUser = req.user
    
    try{
        const pedido = await Pedido.findById(mongoose.Types.ObjectId(id))

        //se pedido existe
        if(!pedido){
            res.status(404).json({errors: ["Pedido não encontrado!"]})
            return
        }
        //check se pedido pertence ao usuário
        if(!pedido.userId.equals(reqUser._id)){
            res.status(422).json({
                errors: ["Ocorreu um erro, por favor tente novamente mais tarde"]
            })
            return
        }
        //delete
        await Pedido.findByIdAndDelete(pedido._id)
        res.status(200).json({id: pedido._id, message: "Pedido excluido com sucesso"})
    } catch(error){
        res.status(404).json({errors: ["Pedido não encontrado!"]})
        return
    }
}

// get all pedidos
const getAllPedidos = async(req, res) => {

    const limit = 100
    var {q} = req.query

    const pedidos = await Pedido.find({}).sort([["createAt", -1]]).limit(100).skip(q).exec()

    return res.status(200).json(pedidos)
}

//get pedidos from an 
const getUserPedidos = async(req, res) => {
    const {id} = req.params

    const pedidos = await Pedido.find({userId: id}).sort([["createAt", -1]]).exec()
    return res.status(200).json(pedidos)
}

//get pedido by id
const getPedidoById = async(req, res) => {
    const {id} = req.params

    const pedido = await Pedido.findById(mongoose.Types.ObjectId(id))

    //check if pedido exists
    if(!pedido){
        return res.status(404).json({errors: ["Pedido não encontrado"]})
    }
    return res.status(200).json(pedido)
}

//update an pedido
const updatePedido = async(req, res) => {
    const {id} = req.params
    const {titulo, tipos, local, desc} = req.body

    const reqUser = req.user
    const pedido = await Pedido.findById(id)

    //check if pedido exists
    if(!pedido){
        return res.status(404).json({errors: ["Pedido não encontrado"]})
    }
    if(!pedido.userId.equals(reqUser._id)){
        return res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde"]})
    }
    if(titulo){
        pedido.titulo = titulo
    }
    if(tipos){
        pedido.tipos = tipos
    }
    if(local){
        pedido.local = local
    }
    if(desc){
        pedido.desc = desc
    }
    await pedido.save()
    return res.status(200).json({pedido, message: "Foto atualizada com sucesso"})
}

//search pedido
const searchPedido = async(req, res) => {
    var {q} = req.query

    if(q.length <= 3){
        if(!q.includes('-')){
            q += "+"
        }
    }

    if(q.includes("+") || q.includes("-")){

        //pega so quando a query se encontra na primeira posição do array
        const pedidos = await Pedido.find({tipos: {$elemMatch: {$eq: q}}}).exec()
        return res.status(200).json(pedidos)

    }
    const pedidos = await Pedido.find({local: new RegExp(q, "i")}).exec()
    return res.status(200).json(pedidos)
}

//make contact
const makeContact = async(req, res) => {
    
    const {destino, origem} = req.body

    const userOrigem = await User.findOne({email: origem}).exec()
    const userDestino = await User.findOne({email: destino}).exec()
    
    const {email, nome, sobrenome, celular} = userOrigem
    const nomeCompleto = nome +" "+ sobrenome

    if(!userDestino){
        res.status(404).json({errors: ["Usuário não encontrado"]})
        return
    }

    try{
        mailer.sendMail({
            to: destino,
            from: 'ajudamais.net@gmail.com',
            template: '/auth/contact',
            context: {nomeCompleto, email, celular}
        }, (err) => {
            if(err) return res.status(404).json({errors: ["Erro ao enviar email..."]}) 
            return res.send()
        })
    } catch(error){
        console.log(error)
    }

    return res.send()
}
module.exports = {
    insertPedido,
    deletePedido,
    getAllPedidos,
    getUserPedidos,
    getPedidoById,
    updatePedido,
    searchPedido,
    makeContact
}