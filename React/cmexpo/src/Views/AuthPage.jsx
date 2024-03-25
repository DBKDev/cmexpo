import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import { accountService } from '../Services/account_service';

const AuthPage = () => {

    const navigation = useNavigate()

    const [formconnexion, setFormconnexion] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setFormconnexion({ ...formconnexion, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formconnexion);
        axios.post('http://localhost:8080/connexion/login', formconnexion)
            .then(res => {
                console.log(res)
                accountService.saveToken(res.data.access_token)
                navigation("/admin")
            })
            .catch(err => console.error(err))
    };


    return (
        <>
            <h1>Page Administrateur</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="Adresse Mail"></label>
                    <input type="email" name='email' value={formconnexion.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="Mot de Passe"></label>
                    <input type="password" name="password" placeholder='***************' value={formconnexion.password} onChange={handleChange} />
                </div>
                <button type='submit' >Envoyer</button>
            </form>
        </>


    );
}

export default AuthPage;