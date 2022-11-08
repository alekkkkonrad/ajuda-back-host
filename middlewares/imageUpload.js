const multer = require("multer")
const path = require("path")

// Destination
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if(req.baseUrl.includes("users")){
            folder="users"
        }
        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //only png ou jpeg
            return cb(new Error("Por favor, envia apenas .png ou .jpg"))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}