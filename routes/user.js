//Imports
const logger = require("../model/logger")(__filename)
const { ensureAuthorized } = require('../model/auth')
const { createAccountLimiter } = require('../model/rateLimit')

module.exports = (app) => {
    try {

        //User Validation
        const userValidation = require("../validation/user/userValidation")()

        //User Controllers
        const user = require("../controller/user/user")()

        //User APIs
        // app.get("/",user.checkCode)
        // app.post('/user/register', createAccountLimiter, userValidation.registerUser, user.register)
        // app.post('/user/login', createAccountLimiter, userValidation.loginUser, user.loginUser)
        // app.get('/user/getAllUser', createAccountLimiter, user.getAllUser)
        app.post("/insertHbl", user.insertHbl)
        
        


    } catch (e) {
        logger.error(`Error in user route: ${e.message}`)
    }
};