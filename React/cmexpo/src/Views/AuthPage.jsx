import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import connexionService from '../Services/connexionService';

import { accountService } from '../Services/account_service';

const AuthPage = () => {

    const navigation = useNavigate()

    const [connexion, setConnexion] = useState({
        emailco: "",
        passwordco: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setConnexion({ ...connexion, [name]: value });
    };

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(connexion);
    //     axios.post('http://localhost:8080/connexion/login', connexion)
    //         .then(res => {
    //             console.log(res)
    //             accountService.saveToken(res.data.access_token)
    //             navigation("/admin")
    //         })
    //         .catch(err => console.error(err))
    // };

    const handleConn = async (e) => {
        e.preventDefault();
        try {
            const response = await connexionService.Logged(connexion);
            console.log(response);
            // Gérer la réponse ici
            console.log(response.data); // Affiche les données de la réponse

            accountService.saveToken(response.data.access_token);
            navigation("/auth/admin");
        } catch (error) {
            console.error("Erreur dans handleConn :", error);
        }
    }

    return (
        <>
            <h1>Page Administrateur</h1>

            <form >
                <div>
                    <label htmlFor="Adresse Mail"></label>
                    <input type="email" name='emailco' value={connexion.emailco} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="Mot de Passe"></label>
                    <input type="password" name="passwordco" placeholder='***************' value={connexion.passwordco} onChange={handleChange} />
                </div>
                <button type='submit' onClick={handleConn} >Envoyer</button>
            </form>
        </>


    );
}

export default AuthPage;