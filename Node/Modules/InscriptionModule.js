const express = require('express');
const router = express.Router();
const InscriptionService = require('../Services/InscriptionService');


router.post('/', async (req, res) => {
    try {
        let data = req.body;
        const userId = await InscriptionService.addInscription(data); // Récupérer l'ID de l'utilisateur nouvellement inscrit
        res.status(201).json({ userId: userId }); // Renvoyer l'ID dans la réponse JSON
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'inscription :', error);
        res.status(500).json({ message: 'Votre ajout ne s\'est pas bien passé', error: error });
    }
});

router.get('/:id', (req, res) => {
    const currentId = req.params.id;
    InscriptionService.fetchQRListe(currentId).then((result) => {
        res.json({ data: result[0] })
    }).catch((err) => {
        console.log(err);
        res.json({ message: "Erreur lors de la récupération de l'ID" });
    });
});

router.post('/', async (req, res) => {
    let data = req.body;
    InscriptionService.addInscriptionExposant(data).then((result) => {
        res.status(201)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json({ "message": "Votre ajout ne s'est pas bien passé", data: err })
    })
});


module.exports = router;