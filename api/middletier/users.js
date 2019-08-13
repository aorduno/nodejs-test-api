const usersRepo = require("../db/dbUsers")

module.exports = {
    resolveFindUser: async function (req, res, next) {
        console.log("resolveFindUser RQ")
        console.log(req.query)
        try {
            const data = await usersRepo.findUsers(req.query.id)
            if (data.error) {
                console.log("Error on resolveFindUser")
                console.log(data.error)
                next(data.error)
            }

            return res.send(data)
        } catch (err) {
            console.log("Error on resolveFindUser")
            console.log(err)
            next(err)
        }
    },

    resolveInsertUser: async function (req, res, next) {
        const responseData = { error: null, data: { inserted: 0 } }
        console.log("resolveInsertUser RQ")
        console.log(req.body)
        try {
            const result = await usersRepo.insertUser(req.body)
            responseData.data.inserted = result
            return res.send(responseData)
        } catch (err) {
            console.log("Error on resolveInsertUser")
            console.log(err)
            next(err)
        }
    },

    resolveUpdateUser: async function (req, res, next) {
        console.log("resolveUpdateUser RQ")
        console.log(req.params)
        const responseData = { error: null, data: { matchedCount: 0, modifiedCount: 0 } }
        const userCriteria = {
            userId: req.params.userId
        }

        try {
            const result = await usersRepo.updateUser(userCriteria, req.body)
            responseData.data.matchedCount = result.matchedCount
            responseData.data.modifiedCount = result.modifiedCount
            return res.send(responseData)
        } catch (err) {
            console.log("Error on resolveUpdateUser")
            console.log(err)
            next(err)
        }
    },

    resolveDeleteUser: async function (req, res, next) {
        console.log("resolveDeleteUser RQ")
        console.log(req.params)

        const userId = req.params.userId
        const responseData = { error: null, data: { deleted: 0 } }
        try {
            const result = await usersRepo.deleteUser(userId)
            responseData.data.deleted = result.result.n
            return res.send(responseData)
        } catch (err) {
            console.log("Error on resolveDeleteUser")
            console.log(err)
            next(err)
        }
    }
}
