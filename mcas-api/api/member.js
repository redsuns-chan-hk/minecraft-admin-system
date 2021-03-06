
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const HttpStatus = require('../data/http-status')
const result = require("../src/result")

const MemberApplication = require('../model/member-application.model')
const AppConstants = require('../data/app-constants')

/**
 * 
 * @api {POST} /member/register Register application of a new member
 * @apiName MemberRegisterApplication
 * @apiGroup member
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {string} discordId The discord ID of user
 * @apiParam  {string} discordName The discord name of user
 * @apiParam  {string} minecraftName The minecraft name of user
 * @apiParam  {string} enterReason The reason of user to enter this server
 * @apiParam  {string} favouriteVtubers The favourite VTubers and reasons of the user
 * @apiParam  {string} source The source where user found this server
 * @apiParam  {string} discordId The discord ID of user
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */
router.post('/register', [
    body('discordId').exists({checkNull: true}),
    body('discordName').exists({checkNull: true}),
    body('minecraftName').exists({checkNull: true}),
    body('enterReason').exists({checkNull: true}),
    body('favouriteVtubers').exists({checkNull: true}),
    body('source').exists({checkNull: true}),
    body('referer').exists({checkNull: false}),
],(req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return result.exception(res, errors.array())
    }
    let defaultFields = {
        status: 'PENDING',
        applyDate: new Date(),
        approveDate: null,
        approvedBy: null
    };
    let application = new MemberApplication({...req.body, ...defaultFields});
    
    /* Find is there any duplicated application. */
    MemberApplication.find({
        discordId: req.body.discordId
    }).then(value => {
        /* Not allow duplicated application. */
        if (value.length > 0) {
            return result.send(res, HttpStatus.OK, true, AppConstants.RECORD_DUPLICATED, req.body)
        } else {
            application.save().then(docs => {
                return result.send(res, HttpStatus.OK, true, AppConstants.RECORD_SAVE_SUCCESS, docs)
            }).catch(reason => {
                return result.exception(res, reason)
            })
        }
    }).catch(reason => {
        return result.exception(res, reason)
    })
})

/**
 * 
 * @api {GET} /member/applications Get Member Applications
 * @apiName GetMemberApplication
 * @apiGroup member
 * @apiVersion  1.0.0
 * 
 * @apiSuccess (200) {Object} response The response object.
 * 
 * @apiSuccessExample {Object} Success-Response:
 * {
 *     ok: true,
 *     status: "success",
 *     message: "Found X records",
 *     details: [Application List]
 * }
 */
router.get('/applications', (req, res) => {
    MemberApplication.find().then(value => {
        return result.send(res, HttpStatus.OK, true, "Found " + value.length + " records", value)
    }).catch(reason => {
        console.error(reason)
        return result.exception(res, reason)
    })
})

module.exports = router
