const db = require('../model/mongodb')

const checkUserInDB = async ({ userId, role, status }) => {
        return await db.findSingleDocument("user", {
          _id: new ObjectId(userId),
          role: role,
          status: status,
        })
    }

    
  module.exports={checkUserInDB}



