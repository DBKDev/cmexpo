import React from 'react';
import { useState } from 'react';
import { countries } from 'countries-list';
import "../Styles/Inscription.css"
import InscriptionService from "../Services/InscriptionService"
import { useNavigate } from 'react-router-dom';

const Inscription = () => {
    const sortedCountries = Object.values(countries).sort((a, b) => a.name.localeCompare(b.name));

    const navigate = useNavigate();

    const [inscription, setInscription] = useState({
        Nom: "",
        Prenom: "",
        Mail: "",
        Adresse1: "",
        Adresse2: "",
        Ville: "",
        CodePostal: "",
        Numero: "",
        Pays: "",
        Societe: "",
        Categorie: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInscription({ ...inscription, [name]: value });
    }

    const handleInscription = async (e) => {
        e.preventDefault();
        console.log(inscription);
        try {
            const response = await InscriptionService.addInscription(inscription)
            console.log(response);
            const userId = response.data.userId; // Récupérer l'ID de l'utilisateur
            console.log("ID de l'utilisateur :", userId);
            navigate(`/qrcode/${userId}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (<>

        <div className='page-inscription'>

            <div className='Image-logo'>
                <img src={process.env.PUBLIC_URL + `/images/CMELOGO.svg`} alt='logo cmevenement' />
            </div>


            <div className='interraction-inscription'>
                <form action="" className='form-0'>
                    <div className='form-1'>
                        <input type="text" name={'Nom'} placeholder='Nom' onChange={handleChange} />
                        <input type="text" name={'Prenom'} placeholder='Prénom' onChange={handleChange} />
                        <input type="email" name={'Mail'} placeholder='Adresse Email' onChange={handleChange} />
                        <input type="text" name={'Adresse1'} placeholder='Adresse Numero 1' onChange={handleChange} />
                        <input type="text" name={"Adresse2"} placeholder='Adresse Numero 2' onChange={handleChange} />
                        <input type="text" name={"Societe"} placeholder='Nom de votre Société' onChange={handleChange} />
                    </div>
                    <div className='form-2'>
                        <input type="text" name={"Ville"} placeholder='Ville' onChange={handleChange} />
                        <input type="number" name={"CodePostal"} placeholder='Code Postal' onChange={handleChange} />
                    </div>
                    <div className='form-3'>
                        <select name={"Pays"} onChange={handleChange}>
                            <option value="" disabled selected>Pays</option> {/* Placeholder */}
                            {sortedCountries.map(country => (
                                <option key={country.name}>{country.name}</option>
                            ))}
                        </select>
                        <select name={"Categorie"} id="" value={inscription.Categorie} onChange={handleChange}>
                            <option value="" disabled>Select Categorie</option>
                            <option value="VIP">VIP</option>
                            <option value="Visiteur">Visiteur</option>
                            <option value="Presse">Presse</option>
                        </select>
                    </div>

                    <div className='form-4'>
                        <div className='numero-form'>
                            <input type="number" name={"Numero"} placeholder='Numero de Téléphone' onChange={handleChange} />
                        </div>
                        <div className='check-form'>
                            <input type="checkbox" className='check-condi' />
                            <p>J'accepte les conditions générales et la politique de confidentialité</p>
                        </div>
                    </div>
                    <button className='form-5-boutton' onClick={handleInscription}>S'inscrire</button>


                </form>
            </div>

        </div>


    </>
    );
}

export default Inscription;