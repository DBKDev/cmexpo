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

export default {
    addInscription,
    getQRCode
}