const {body} = require("express-validator")

const userCreateValidation = () => {

    return [
        body("nome")
            .isString()
            .withMessage("O nome é obrigatório")
            .isLength({min: 3})
            .withMessage("O nome precisa ter no mínimo 3 caracteres"),
        body("sobrenome")
            .isString()
            .withMessage("O sobrenome é obrigatório")
            .isLength({min: 3})
            .withMessage("O sobrenome precisa ter no mínimo 3 caracteres"),
        body("email")
            .isString()
            .withMessage("O E-mail é obrigatório")
            .isEmail()
            .withMessage("Insira um E-mail válido"),
        body("ano")
            .isString()
            .withMessage("O ano é obrigatório")
            .isLength({min: 4})
            .withMessage("Insira um ano válido - formato xxxx")
            .isLength({max: 4})
            .withMessage("Insira um ano válido - formato xxxx"),
        body("celular")
            .isString()
            .withMessage("O celular é obrigatório")
            .isLength({min: 11})
            .withMessage("O celular é composto por 11 caracteres. ex: DD9XXXXXXXX")
            .isLength({max: 11})
            .withMessage("O celular é composto por 11 caracteres. ex: DD9XXXXXXXX"),
        body("local")
            .isString()
            .withMessage("A localização é obrigatória"),
        body("senha")
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({min: 6})
            .withMessage("A senha precisa ter ao menos 6 caracteres"),
        body("confirmaSenha")
            .isString()
            .withMessage("A confirmação de senha é obrigatória")
            .custom((value, {req}) => {
                if(value != req.body.senha){
                    throw new Error("As senhas não coincidem")
                }
                return true
            }),
    ]
}

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório")
            .isEmail()
            .withMessage("Insira um e-mail válido"),
        body("senha")
            .isString()
            .withMessage("A senha é obrigatória")
    ]
}

const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({min: 3})
            .withMessage("O nome precisa ter no mínimo 3 caracteres"),
        body("sobrenome")
            .optional()
            .isLength({min: 3})
            .withMessage("O sobrenome precisa ter no mínimo 3 caracteres"),
        body("password")
            .optional()
            .isLength({min: 6})
            .withMessage("A senha precisa ter ao menos 6 caracteres"),
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
}