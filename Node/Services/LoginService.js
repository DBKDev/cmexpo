const conn = require('./Database');


const startLogin = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT Mail_E, Mdp_E FROM exposant WHERE Mail_E = ?`;
        conn.query(sql, [email], (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération de l\'utilisateur par email:', err);
                reject(err);
            } else {
                // results contient les résultats de la requête
                // Si l'utilisateur est trouvé, results contiendra ses informations
                // Sinon, results sera un tableau vide
                resolve(results[0] ? results[0] : null);
            }
        });
    });
};




module.exports = {
    startLogin
};