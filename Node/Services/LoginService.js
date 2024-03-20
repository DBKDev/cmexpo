const conn = require('./Database');


const login = (user) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT Mail_E, Mdp_E FROM exposant WHERE Mail_E = ? AND Mdp_E =?`;
        let query = conn.query(sql,[user.email, user.password], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};




module.exports = {
    login
};