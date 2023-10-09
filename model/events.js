"use strict"
const db = require('../model/mongodbClone')
const logger = require('../model/logger')(__filename)
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

//Clone Schema Insert Event 
const insertFunction = async (cloneCollection, cloneData) => {
    let insertStaus
    try {
        insertStaus = await db.insertSingleDocument(cloneCollection, cloneData)
        if (insertStaus) {

            logger.info(`eventEmitter('insert') Completed - ${cloneCollection} schema`)
        }
    }
    catch (error) {
        logger.error(`Error in eventEmitter('insert') - ${cloneCollection} schema: ${error.message}`)
    }
}

module.exports = {
    eventEmitterInsert: eventEmitter.on('insert', insertFunction)
}