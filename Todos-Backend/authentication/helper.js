const bcrypt = require('bcrypt');

const hashPassword = async(password) => {
   
    try {
        const salt = await bcrypt.genSalt(10)
      
        const passwordDigest = await bcrypt.hash(password, salt)
 
            return passwordDigest

    } catch  (err){
        console.log('error', err)

    }

}

const comparePassword = async(candidatePassword, passwordDigest) => {
    try {
        const match = await bcrypt.compare(candidatePassword, passwordDigest)
        return match
    } catch (err) {
        console.log('error', err)
    }
}

const loginRequired = (req, res, next) => {
     console.log(req.session)
    if (req.user) return next()
    res.status(401).json({
        payload: null,
        msg: "You need to be logged in to access this route",
        err: true
    })
}

module.exports = {
    hashPassword,
    comparePassword,
    loginRequired
}