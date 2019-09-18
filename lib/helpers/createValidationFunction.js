const Joi = require('@hapi/joi')

function createValidationFunction(validation) {
    const validationFunction = function(value) {
        const schema = eval(validation)
        const { error, val } = schema.validate(value)
        if (!error) {
            return true
        }
        return error.details[0].message
    }
    return validationFunction
}
module.exports = createValidationFunction
