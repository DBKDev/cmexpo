import axios from "axios";

function addInscription(inscription){
    return axios.post("http://localhost:8080/inscription", inscription, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function getQRCode(userId) {
    return axios.get(`http://localhost:8080/inscription/${userId}`);
}

function addinscriptionExposant(expoinscri){
    return axios.post("http://localhost:8080/inscription", expoinscri, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export default {
    addInscription,
    getQRCode,
    addinscriptionExposant
}
