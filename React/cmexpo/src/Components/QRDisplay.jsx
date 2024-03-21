import React, { useEffect, useState } from 'react';
import QRCodePage from '../Views/QRCodePage'
import InscriptionService from '../Services/InscriptionService';
import { useParams } from 'react-router-dom';
import "../Styles/Badge.css"

const QRDisplay = () => {
    const { userId } = useParams(); // Récupérer l'ID de l'utilisateur depuis les paramètres d'URL
    const [qrCodeData, setQrCodeData] = useState('');
    const [mailinscri, setMailinscri] = useState('');
    const [nominscri, setNominscri] = useState('');
    const [catégorieinscri, setCatégorieinscri] = useState('');

    const fetchQRCodeData = async () => {
        try {
            const response = await InscriptionService.getQRCode(userId);
            console.log(userId);
            console.log("Réponse du service getQRCode :", response);
            console.log(response.data);

            const qrCodeData = response.data.data.Code_I;
            setQrCodeData(qrCodeData);

            setMailinscri(response.data.data.Mail_I);
            setNominscri(response.data.data.Nom_I);
            setCatégorieinscri(response.data.data.Categorie_I);

        } catch (error) {
            console.error("Erreur lors de la récupération du code QR :", error);
        }
    };

    useEffect(() => {
        fetchQRCodeData();
    }, [userId]);


    let imageSource;
    if (catégorieinscri === 'Presse') {
        imageSource = process.env.PUBLIC_URL + `/images/BADGEPRESS.png`;
    } else if (catégorieinscri === 'VIP') {
        imageSource = process.env.PUBLIC_URL + `/images/BADGEVIP.png`;
    } else {
        imageSource = process.env.PUBLIC_URL + `/images/BADGEVISITEUR.png`;
    }



    return (
        <>
            <div className='Image-logo'>
                <img src={process.env.PUBLIC_URL + `/images/CMELOGO.svg`} alt='logo cmevenement' />
            </div>


            <div className='positionbadge'>
                <div className='BADGE-LOGO'>
                    <img src={imageSource} alt='Badge'  />
                
                    <div className='qr_position'>
                        {qrCodeData && <QRCodePage qrCodeData={qrCodeData}  mailinscri={mailinscri} nominscri={nominscri} />}
                        {/* <QRCodePage mailinscri={mailinscri} /> */}
                    </div>
                </div>
            </div>
        </>

    );
};

export default QRDisplay;
