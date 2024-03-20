const express = require('express');
const router = express.Router();
const ScannerService = require('../Services/ScannerService');


router.get('/', async (req, res) => {
    const currentId = req.body;
    ScannerService.ListeVisiteurs(currentId).then((result) => {
        res.json({ data : result[0]})
    }).catch((err) => {
        console.log(err);
        res.json({ message : "Erreurs lors de la récupération de l'ID " })
    })
})


router.post('/', (req, res)=>{
    let data = req.body;
    ScannerService.AjoutScan(data).then(result =>{
        res.status(201)
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({ "message": "Votre ajout ne s'est pas bien passé", data: err })
    })
})


module.exports = router;