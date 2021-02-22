
const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

const discord_oauth2 = require('../secure/discord-oauth2.json')

router.post('/auth', (req, res) => {

    if (req.body == undefined) {
        return res.status(500).json({
            ok: false,
            message: "req.body === undefined"
        })
    }

    /* Refresh Discord access token with Discord refresh token. */
    if (req.body.token != undefined) {
        let uri = new URL('https://discord.com/api/oauth2/refresh')
        let params = {
            client_id: discord_oauth2.client_id,
            client_secret: discord_oauth2.client_secret,
            grant_type: 'refresh_token',
            refresh_token: req.body.token,
            scope: 'identify email connections'
        }
        Object.keys(params).forEach(k => uri.searchParams.append(k, params[k]))
        fetch('', {
            method: 'POST'
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
                scope: 'identify'
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

router.get('token', (req, res) => {
    console.log(req.params)
})

module.exports = router;
