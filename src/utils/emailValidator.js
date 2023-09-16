import validator from 'email-validator'

function isEmail(email){
    return validator.validate(email)
}

export default isEmail