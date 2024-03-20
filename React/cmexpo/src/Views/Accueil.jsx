import React from 'react';
import "../Styles/Accueil.css"
import { Link } from 'react-router-dom';


const Accueil = () => {
    return (<>
        <div className='page-accueil'>

            <div className='Image-logo'>
                <img src={process.env.PUBLIC_URL + `/images/CMELOGO.svg`} alt='logo cmevenement' />
            </div>


            <div className='interraction-accueil'>
                <div className='bouton-accueil'>
                    <Link Link to={"/inscription"} className='bouton-accueil-1'> Je suis Visiteur</Link>
                    <p>ou</p>
                    <Link Link to={"/inscription"} className='bouton-accueil-2'>Je suis Exposant</Link>
                </div>
                <div className='text-accueil'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Pariatur qui quaerat animi eaque tenetur!</p>
                </div>
            </div>

        </div>
    </>
    );
}

export default Accueil;