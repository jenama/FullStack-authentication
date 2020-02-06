const bcrypt = require('bcrypt');

const hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const password_serie = await bcrypt.hash(password, salt)
        console.log('password', password_serie)
            return password_serie

    } catch  (err){
        console.log('error', err)

    }

}

const comparePassword= () => {

}

const loginRequired = () => {

}

module.exports = {
    hashPassword,
    comparePassword,
    loginRequired
}