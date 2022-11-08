const {body} = require("express-validator")

const pedidoInsertValidation = () => {
    return[
        body("titulo")
        .not()
        .equals("undefined")
        .withMessage("O títutlo é obrigatório")
        .isString()
        .withMessage("O título é obrigatório")
        .isLength({min: 3})
        .withMessage("o título precisa ter mais de 3 caracteres"),
        body("local")
        .not()
        .equals("undefined")
        .withMessage("O local de doação é obrigatório")
        .isString()
        .withMessage("O local de doação é obrigatório")
        .isLength({min: 5})
        .withMessage("O local de doação contém mais de de 5 caracteres"),
        body("tipos")
        .isLength({min: 1})
        .withMessage("Insira ao menos um tipo sanguíneo para a doação"),
    ]
}

const pedidoUpdateValidation = () => {
    return [
        body("titulo")
        .optional()
        .isString()
        .withMessage("O título é obrigatório")
        .isLength({min: 3})
        .withMessage("o título precisa de mais de 3 caracteres"),
    ]
}
module.exports = {
    pedidoInsertValidation,
    pedidoUpdateValidation,
}