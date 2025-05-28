import React, { useState } from 'react';
import InscriptionService from '../../Services/InscriptionService';
import NavBarDash from '../../Components/NavBarDash';
import "../../Styles/Administrateur/exposant.css"

const DashExposant = () => {

    const [expoinscri, setExpoinscri] = useState({
        Nom: "",
        Mail: "",
        Mdp: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setExpoinscri({ ...expoinscri, [name]: value });
    };

    const handleInscription = async (e) => {
        e.preventDefault();
        console.log("handle inscri", expoinscri);
        try {
            const response = await InscriptionService.addinscriptionExposant(expoinscri);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <>
            <NavBarDash />
            <div className='placement-form-dash'>
                <form action="" className='formulaire-expo'>
                    <div>
                        <div className='Nom-expo'>
                            <label htmlFor="">Nom de l'exposant</label>
                            <input type="text" onChange={handleChange} />
                        </div>
                        <div className='Mail-expo'>
                            <label htmlFor="">Adresse mail</label>
                            <input type="email" onChange={handleChange} />
                        </div>
                        <div className='Mdp-expo'>
                            <label htmlFor="">Mot de passe</label>
                            <input type="text" onChange={handleChange} />
                        </div>
                    </div>

                    <button onClick={handleInscription} className='expo-envoie'>Envoyer</button>

                </form>
            </div>


            <div className='List-exposant'>
                <div>
                    <tr>
                        <th>Nom</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Adresse mail</th>
                        <td></td>
                    </tr>                    
                </div>
            </div>
        </>
    );
}

export default DashExposant;