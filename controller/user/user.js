'use strict'
//Imports
const db = require('../../model/mongodb')
const common = require('../../model/common')
const { message } = require('../../model/message')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose')
const logger = require('../../model/logger')(__filename)
const { ObjectId } = require('bson')
const event = require('./../../model/events')
const fs = require('fs').promises
const jwt = require("jsonwebtoken")

module.exports = function () {
  let router = {}
  router.checkCode = (req, res) => {

    return res.send("Hello Node...")
  }

  //Router Functions
  //Register
  router.register = async (req, res) => {
    let data = { status: 0, response: message.inValid }

    try {
      let userData = req.body, checkEmail, insertUser

      if (Object.keys(userData).length === 0 && userData.data === undefined) {
        res.send(data)

        return
      }
      userData = userData.data[0]
      userData.password = bcrypt.hashSync(userData.password, 10)
      userData.systemInfo = req.rawHeaders

      checkEmail = await db.findOneDocumentExists("user", { "email": userData.email })
      if (checkEmail === true) {

        return res.send({ status: 0, response: message.emailExist })
      }

      insertUser = await db.insertSingleDocument("user", userData)
      if (Object.keys(insertUser).length !== 0) {

        event.eventEmitterInsert.emit(
          'insert',
          'userClone',
          {
            "originalId": insertUser._doc._id,
            "actionType": 'insert',
            "fullName": userData.fullName,
            "actionMessage": 'Registered',
            "data": insertUser._doc
          }
        )
        return res.send({ status: 1, data: insertUser._id, response: message.registerSuccess })
      }
    } catch (error) {
      logger.error(`Error in user controller - register: ${error.message}`)
      res.send(error.message)
    }
  }



  router.insertHbl = async (req,res) => {
    let data = { status: 0, response: "Invalid data" }

    try {
      let userData = req.body,  insertUser

      if (Object.keys(userData).length === 0 && userData.data === undefined) {
        res.send(data)

        return
      }
      userData = userData.data[0]
      userData.systemInfo = req.rawHeaders

      insertUser = await db.insertSingleDocument("hbl", userData)
      if (Object.keys(insertUser).length !== 0) {

        return res.send({ status: 1, response: "inserted successfully" })
      }
    } catch (error) {
      logger.error(`Error in user controller - register: ${error.message}`)
      res.send(error.message)
    }
  }



  return router
}
