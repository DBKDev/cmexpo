const loginService = require('../Services/LoginService');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = "+CevHtq/x?B0gZz;&`h@k:3Zz7]TEOwMA7j}[Ot<W:qH3$<&!jqe40sc$Lp&#MV";



// router.post('/', (req, res) => {
//     const user = req.body;
//     if (user.email == undefined || user.password == undefined) {
//         res.json({ "message": "Veuillez-renseigner un email et un password" })
//     }

//     loginService.login(user).then((result) => {
//         const token = jwt.sign({
//             user: result[0]
//         }, SECRET, { expiresIn: '3 hours' })

//         res.json({ access_token: token })
//     }).catch((err) => {
//         res.json({ message: err })
//     })
// })


router.post('/', async (req, res) => {
    const { connexion } = req.body;
    console.table(connexion);
    console.log('email ' + connexion.emailco);
    console.log('mot de passe ' + connexion.passwordco);

    if (!connexion.emailco || !connexion.passwordco) {
        return res.status(400).json({ message: 'Veuillez entrer un email et un mot de passe corrects' });
    }

    try {
        // Récupérer les informations de l'utilisateur à partir de la base de données
        const user = await loginService.startLogin(connexion.emailco);
        console.log("connexion+mailco", connexion.emailco);

        // Vérifier si l'utilisateur existe
        if (!user) {
            console.log('Identifiant incorrect');
            return res.status(401).json({ message: 'Identifiant incorrect' });
        }

        // Vérifier si le mot de passe correspond
        if (user.Mdp_E !== connexion.passwordco) {
            console.log('Mot de passe incorrect');
            return res.status(401).json({ message: 'Identifiant incorrect' });
        }

        // Générer le token JWT
        const token = jwt.sign({ user }, SECRET, { expiresIn: '3 hours' });
        console.log('Token JWT généré avec succès');

        // Si tout est correct, renvoyer une réponse réussie avec le token JWT
        res.status(200).json({ message: 'Connexion réussie', access_token: token });
    } catch (error) {
        console.error('Erreur lors de la vérification des identifiants :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la vérification des identifiants' });
    }
});



module.exports = router;