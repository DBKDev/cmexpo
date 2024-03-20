const jwt = require('jsonwebtoken');
const SECRET = "+CevHtq/x?B0gZz;&`h@k:3Zz7]TEOwMA7j}[Ot<W:qH3$<&!jqe40sc$Lp&#MV";


// /* Récupération du header bearer /
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

// Vérification du token 
const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Token inexistant' })
    }

    // Véracité du token
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Mauvais token' })
        } else {
            return next()
        }
    })
}


module.exports = {
    checkTokenMiddleware
}