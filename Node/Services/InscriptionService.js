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
        const sql = `SELECT ID_I, Code_I FROM qrcode WHERE ID_I = ?`;
        let query = conn.query(sql, [id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}


module.exports = {
    addInscription,
    fetchQRListe
}