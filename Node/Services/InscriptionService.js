const conn = require('./Database');
const qr = require('qrcode');
const zlib = require('zlib');
const brotli = require('brotli');

const MAX_QR_CODE_LENGTH = 800; // Définir la longueur maximale du code QR

const addInscription = (inscription) => {
    return new Promise((resolve, reject) => {
        let sql1 = 'INSERT INTO inscription (Nom_I, Prenom_I, Mail_I, Adresse1_I, Adresse2_I, Ville_I, CP_I, Numero_I, Pays_I, Societe, Categorie_I) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        let sql2 = 'INSERT INTO qrcode (ID_I, Code_I) VALUES (?,?)';

        // Première requête pour insérer les données dans la table 'inscription'
        conn.query(sql1, [inscription.Nom, inscription.Prenom, inscription.Mail, inscription.Adresse1, inscription.Adresse2, inscription.Ville, inscription.CodePostal, inscription.Numero, inscription.Pays, inscription.Societe, inscription.Categorie], (err, result1) => {
            if (err) return reject(err);

            // Récupérer l'ID généré lors de l'insertion dans la table 'inscription'
            const insertedId = result1.insertId;

            // Générer le QR code avec le nom de l'utilisateur
            const qrCodeText = `${inscription.Mail}${insertedId}`;

            // Limiter la longueur du code QR
            const truncatedQrCodeText = qrCodeText.substring(0, MAX_QR_CODE_LENGTH);

            // Compresser le QR code avec Brotli
            const compressedQrCodeData = brotli.compress(truncatedQrCodeText, { quality: 8 });

            // Deuxième requête pour insérer les données dans la table 'qrcode' avec l'ID correspondant et le QR code compressé
            conn.query(sql2, [insertedId, compressedQrCodeData.toString('base64')], (err, result2, fields) => {
                if (err) return reject(err);
                resolve(insertedId); // Renvoyer l'ID généré
            });
        });
    });
};

const fetchQRListe = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT i.Nom_I, i.Mail_I,i.Id_I ,i.Categorie_I, q.Id_I , q.Code_I
                    from qrcode as q
                    INNER JOIN inscription as i on q.Id_I = i.Id_I
                    Where i.Id_I = ?;`;
        let query = conn.query(sql, [id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

const addInscriptionExposant = (expoinscri) => {
    return new Promise((resolve, reject) =>{
        const sql = `INSERT INTO exposant (Nom_E, Mail_E, Mdp_E) VALUES (?,?,?)`;
        conn.query(sql, [expoinscri.Nom, expoinscri.Mail, expoinscri.Mdp], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}


module.exports = {
    addInscription,
    fetchQRListe,
    addInscriptionExposant
}