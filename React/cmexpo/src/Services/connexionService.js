import axios from "axios";

function Logged(connexion){
    return axios.post("http://localhost:8080/connexion", {connexion}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}



export default {
Logged
}