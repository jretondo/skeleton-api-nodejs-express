const express = require('express')
const router = express.Router()
const secure = require('./secure')
const response = require("../../../network/response")
const Controller = require("./index")

//internal Functions
const list = (req, res, next) => {
    Controller.list()
        .then(lista => {
            response.success(req, res, 200, lista)
        })
        .catch(next)
}

const get = (req, res, next) => {
    Controller.get(parseInt(req.params.id))
        .then(user => {
            response.error(req, res, 200, user)
        })
        .catch(next)
}

const upsert = (req, res, next) => {
    Controller.upsert(req.body)
        .then(() => {
            response.success(req, res, 201, "Usuario creado")
        })
        .catch(next)
}

//Routes
router.get("/", secure(), list)
router.get("/get/:id", secure(), get)
router.post("/", secure(), upsert)
router.put("/", secure(), upsert)

module.exports = router