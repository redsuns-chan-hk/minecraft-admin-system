
const express = require('express')
const { body, validationResult } = require('express-validator')
const fetch = require('node-fetch')
const router = express.Router()

const constants = require('../data/app-constants')
const HttpStatus = require('../data/http-status')
const result = require('../src/result')

const discord_oauth2 = require('../secure/discord-oauth2.json')

const discord = require('../src/discord')
const { guilds } = require('../src/discord')
const config = require('../config.json')

const MemberApplication = require('../model/member-application.model')
const Player = require('../src/player')

router.post('/auth', (req, res) => {

    if (req.body == undefined) {
        return result.send(res, HttpStatus.UNAUTHORIZED, false, "No Authorization Info Found.", null)
    }

    /* Refresh Discord access token with Discord refresh token. */
    if (req.body.token != undefined) {
        let uri = new URL('https://discord.com/api/oauth2/token')
        let params = {
            client_id: discord_oauth2.client_id,
            client_secret: discord_oauth2.client_secret,
            grant_type: 'refresh_token',
            refresh_token: req.body.token,
            scope: 'identify email connections guilds'
        }
        Object.keys(params).forEach(k => uri.searchParams.append(k, params[k]))
        fetch(uri.toString(), {
            method: 'POST',
            body: uri.toString().split('?')[1],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json()).then(json => {
            res.status(200).json(json)
        })
    } else {
        /* Get a new discord token with authorization code. */
        if (req.body.code != undefined) {
            let uri = new URL('https://discord.com/api/oauth2/token')
            let params = {
                client_id: discord_oauth2.client_id,
                client_secret: discord_oauth2.client_secret,
                grant_type: 'authorization_code',
                code: req.body.code,
                redirect_uri: 'http://127.0.0.1:4200/apply',
                scope: 'identify email connections guilds'
            }
            Object.keys(params).forEach(k => uri.searchParams.append(k, params[k]))
            fetch(uri.toString(), {
                method: 'POST',
                body: uri.toString().split('?')[1],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => response.json()).then(json => {
                res.status(200).json(json)
            })
        }
    }
})

router.post('/user/is/admin', [
    body('discordId').exists({checkNull: true})
], (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return result.exception(res, errors.array())
    }
    Player.isAdmin(discord, req.body.discordId, (isAdmin) => {
        if (isAdmin) {
            return result.send(res, HttpStatus.OK, true, "User is an admin", isAdmin)
        } else {
            return result.send(res, HttpStatus.UNAUTHORIZED, false, "User is NOT an admin", isAdmin)
        }
    })
})


/**
 * 
 * @api {POST} /member/is/applied IsUserAppliedMember
 * @apiName IsUserAppliedMember
 * @apiGroup member
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} userId The user ID of Discord
 * @apiParam  {String} userName The user name of Discord
 * 
 * @apiSuccess (200) {Boolean} applied Whether user submitted an application before.
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     userId: '1234',
 *     userName: 'Chan Tai Ming'
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     data: true
 * }
 * 
 */
 router.post('/user/is/applied', [
    body('discordId').exists({checkNull: true}),
    body('discordName').exists({checkNull: true})
], (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return result.exception(res, errors.array())
    }
    MemberApplication.find({
        discordId: req.body.discordId,
        discordName: req.body.discordName
    }).then(value => {
        let applied = (value != undefined && value != null && value.length > 0);
        return result.send(res, HttpStatus.OK, true, applied ? "User was applied" : "User is not applied", applied);
    })
})

module.exports = router;
