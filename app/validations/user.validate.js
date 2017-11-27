const Joi = require('joi'),
statusCode = require('../../utils/statusCode');

module.exports = {
dataVal: {
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required()
    },
    options: {
        status: statusCode.status400,
        statusText: 'Please provide required fields'
    }
}
}