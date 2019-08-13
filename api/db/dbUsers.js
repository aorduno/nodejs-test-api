const { clientConnect, clientClose, generateObjectId, getDbName } = require("./dbBase")

const collectionName = "users"
const userRepo = {
    findUsers: function (userid) {
        return new Promise((resolve, reject) => (
            clientConnect()
                .then(client => {
                    console.log("finding user for userid " + userid)
                    let queryFilter = {}
                    if (userid !== undefined) {
                        console.log("userid here " + userid)
                        const objectId = generateObjectId(userid)
                        queryFilter = { _id: objectId }
                    }

                    client
                        .db(getDbName())
                        .collection(collectionName)
                        .find(queryFilter)
                        .toArray((err, data) => {
                            console.log("error!")
                            console.log(err)
                            if (err !== null) {
                                reject(err)
                            }

                            clientClose(client)
                            resolve(data)
                        })
                })
                .catch(err => {
                    console.log(`error detected on findUser: ${err}`)
                    reject(err)
                })
        ))
    },

    insertUser: function (userData) {
        return new Promise((resolve, reject) => (
            clientConnect()
                .then(client => {
                    console.log("inserting user for data")
                    console.log(userData)

                    const userDocument = {
                        name: {
                            first: userData.firstName,
                            last: userData.lastName
                        },
                        age: userData.age
                    }

                    client
                        .db(getDbName())
                        .collection(collectionName)
                        .insertOne(userDocument, function (err, result) {
                            if (err !== null) {
                                reject(err)
                            }

                            resolve(result)
                        })
                })
                .catch(err => {
                    console.log(`error detected on insertUser: ${err}`)
                    reject(err)
                })
        ))
    },

    updateUser: function (matchCriteria, userData) {
        return new Promise((resolve, reject) => (
            clientConnect()
                .then(client => {
                    // only userid for now...
                    const userId = matchCriteria.userId
                    console.log(`updating user ${userId}`)
                    console.log(userData)

                    const userDocument = {
                        name: {
                            first: userData.firstName,
                            last: userData.lastName
                        },
                        age: userData.age
                    }

                    const queryFilter = {
                        _id: generateObjectId(userId)
                    }

                    client
                        .db(getDbName())
                        .collection(collectionName)
                        .updateOne(queryFilter, { $set: userDocument }, function (err, result) {
                            if (err !== null) {
                                reject(err)
                            }

                            resolve(result)
                        })
                })
                .catch(err => {
                    console.log(`error detected on updateUser: ${err}`)
                    reject(err)
                })
        )
        )
    },

    deleteUser: function (userId) {
        return new Promise((resolve, reject) => (
            clientConnect()
                .then(client => {
                    const queryFilter = {
                        _id: generateObjectId(userId)
                    }
                    console.log(`deleting user for id ${userId}`)

                    client
                        .db(getDbName())
                        .collection(collectionName)
                        .deleteOne(queryFilter, function (err, result) {
                            if (err !== null) {
                                reject(err)
                            }

                            resolve(result)
                        })
                })
                .catch(err => {
                    console.log(`error detected on deleteUser: ${err}`)
                    reject(err)
                })
        )
        )
    }
}

module.exports = userRepo
