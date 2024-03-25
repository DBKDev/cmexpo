const loginService = require('../Services/LoginService');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = "+CevHtq/x?B0gZz;&`h@k:3Zz7]TEOwMA7j}[Ot<W:qH3$<&!jqe40sc$Lp&#MV";



router.post('/login', (req,res) => {
    const user = req.body;
    if (user.email == undefined || user.password == undefined){
        res.json({"message" : "Veuillez-renseigner un email et un password"})
    }
    
    loginService.login(user).then((result) => {
        const token = jwt.sign({
            user : result[0]
        }, SECRET, {expiresIn: '3 hours'})

        res.json({access_token : token})
    }).catch((err) => {
        res.json({message : err})
    })
})


module.exports = router;