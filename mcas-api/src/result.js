
const http = require("http");
const HttpStatus = require("../data/http-status");
const Constant = require("../data/app-constants");

/**
 * The model class of the standard system response.
 */
class Result {
	constructor() {
		this.ok = true;
		this.status = HttpStatus.OK;
		this.summary = http.STATUS_CODES[HttpStatus.OK];
		this.detail = "Request processed successfully";
		this.data = {};
	}

	/**
	 * Send the response back to the client.
	 *
	 * @param {Object} res The Response object.
	 * @param {Number} status The HTTP Status Code
	 * @param {Boolean} ok Is the method logic executed successfully.
	 * @param {String} detail The message return to the client.
	 * @param {Object} data The data set that return to the client.
	 */
	static send(res, status, ok, detail, data) {
		let result = new Result();
		result.ok = ok;
		result.status = status;
		result.summary = http.STATUS_CODES[status];
		result.detail = detail;
		result.data = data;
		return res.status(status).json(result || {});
	}

	static exception(response, exception) {
		// console.trace(exception);
		this.send(response, HttpStatus.INTERNAL_SERVER_ERROR, false, Constant.FAIL, exception);
	}
}

module.exports = Result;