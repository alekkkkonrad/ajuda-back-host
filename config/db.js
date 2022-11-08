const mongoose = require("mongoose")
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

//connection
const conn = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.kj5qzxe.mongodb.net/?retryWrites=true&w=majority`) 

        return dbConn
    } catch (error) {
        console.log(error)
    }
}
conn()

module.exports = conn