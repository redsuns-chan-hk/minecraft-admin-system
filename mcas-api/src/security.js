
const express = require('express')
const router = express.Router()

class Security {

    static isAdmin(req, res, next){
        console.log(req)
        next();
    }



}

module.exports = Security;
