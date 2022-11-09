const multer = require("multer")
const path = require("path")
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

// Destination
/*const imageStorage = multer.diskStorage({
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
})*/

const storageTypes = {
    local: multer.diskStorage({
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
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'ajudamais',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
}

const imageUpload = multer({
    storage: storageTypes.s3,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //only png ou jpeg
            return cb(new Error("Por favor, envia apenas .png ou .jpg"))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}