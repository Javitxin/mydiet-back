const admin = require('../config/firebase-admin.js')

const decodeToken = async (req, res, next) =>{
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(decodeValue){
            req.user = decodeValue
            return next();
        }        

    } catch (error) {
        return res.json({mensaje:'token no autorizado'})
    }
}

module.exports = decodeToken