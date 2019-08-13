var express = require("express")
var router = express.Router()
var usersMiddleTier = require("../middletier/users")

// @TODO:aorduno -- would be nice to have ResponseClasses for each endpoint so we have more control and better documentation on them...
router.get("/", function (req, res, next) {
    return usersMiddleTier.resolveFindUser(req, res, next)
})

router.post("/", function (req, res, next) {
    return usersMiddleTier.resolveInsertUser(req, res, next)
})

router.put("/:userId", function (req, res, next) {
    return usersMiddleTier.resolveUpdateUser(req, res, next)
})

router.delete("/:userId", function (req, res, next) {
    return usersMiddleTier.resolveDeleteUser(req, res, next)
})

module.exports = router
