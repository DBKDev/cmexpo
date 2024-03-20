const conn = require('./Database');

const ListeVisiteurs = (scan) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT i.Nom_I, i.Prenom_I, s.ID_E, s.ID_I
        FROM scanner as s
        INNER JOIN inscription as i ON s.ID_I = i.ID_I
        WHERE s.ID_E = ? `;
        let query = conn.query(sql, [scan.id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

const AjoutScan = (scanner) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO SCANNER (ID_I, ID_E) VALUES (?, ?)`;
        conn.query(sql, [scanner.Idi, scanner.Ide],(err, result, field) => {
    if (err) return reject(err);
    resolve(result);
});
    });
};


module.exports = {
    ListeVisiteurs,
    AjoutScan
}