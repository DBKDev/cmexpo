import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import connexionService from '../Services/connexionService';
import "../Styles/Administrateur/auth.css"
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



    const handleConn = async (e) => {
        e.preventDefault();
        try {
            const response = await connexionService.Logged(connexion);
            console.log(response);
            // Gérer la réponse ici
            console.log(response.data); // Affiche les données de la réponse

            accountService.saveToken(response.data.access_token);
            navigation("/auth/Qrscan");
        } catch (error) {
            console.error("Erreur dans handleConn :", error);
        }
    }

    return (
        <>
            <div className='back-test'>
                <div class="wrapper">
                    <form action="" class="Login">
                        <h1>Connexion</h1>
                        <div class="input-box">
                            <input type="text" placeholder="Adresse Mail" name='emailco' required value={connexion.emailco} onChange={handleChange} />
                            <i class='bx bxs-user'></i>
                        </div>
                        <div class="input-box">
                            <input type="password" placeholder="Mot de Passe" name="passwordco" value={connexion.passwordco} onChange={handleChange} required />
                            <i class='bx bxs-lock-alt'></i>
                        </div>

                        <div class="remember-forgot">
                            <div className='remember-forgot-coche'>
                                <input type="checkbox" name="coche" id='coche'/>
                                <label for="coche" htmlFor="">Rester connecté</label>
                            </div>
                            <a href="#">Mot de passe oublié?</a>
                        </div>

                        <button type="submit" class="btn" onClick={handleConn}>Se connecter</button>

                        

                    </form>
                </div>
            </div>

        </>


    );
}

export default AuthPage;