import React, { useEffect, useState, useRef } from 'react';
import QRCodePage from '../Views/QRCodePage';
import InscriptionService from '../Services/InscriptionService';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas'; // Importez html2canvas
import "../Styles/Badge.css";

const QRDisplay = () => {
    const { userId } = useParams();
    const [qrCodeData, setQrCodeData] = useState('');
    const [mailinscri, setMailinscri] = useState('');
    const [nominscri, setNominscri] = useState('');
    const [catégorieinscri, setCatégorieinscri] = useState('');
    const positionBadgeRef = useRef(null); // Référence pour la div positionbadge

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

    // Fonction pour télécharger l'image
    const downloadImage = () => {
        html2canvas(positionBadgeRef.current).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'badge.png';
            link.click();
        });
    };

    let imageSource;
    if (catégorieinscri === 'Presse') {
        imageSource = process.env.PUBLIC_URL + `/images/Presse.png`;
    } else if (catégorieinscri === 'VIP') {
        imageSource = process.env.PUBLIC_URL + `/images/VIP.png`;
    } else {
        imageSource = process.env.PUBLIC_URL + `/images/Visiteur.png`;
    }

    let qrPosition;
    if (catégorieinscri === 'Presse') {
        qrPosition = { top: '32rem', left: '210px' }; // Exemple de position pour la catégorie Presse
    } else if (catégorieinscri === 'VIP') {
        qrPosition = { top: '32rem', left: '200px' }; // Exemple de position pour la catégorie VIP
    } else {
        qrPosition = { top: '32rem', left: '215px' }; // Exemple de position pour la catégorie Visiteur
    }

    return (
        <>
            <div className='Image-logo-badge'>
                <img src={process.env.PUBLIC_URL + `/images/CMELOGO.svg`} alt='logo cmevenement' />
            </div>
            <div className='Download-btn'>
                <button onClick={downloadImage}>Télécharger mon Badge</button>
            </div>
            <div className='positionbadge' ref={positionBadgeRef}>
                <div className='BADGE-LOGO'>
                    <img src={imageSource} alt='Badge' />

                    <div className='qr_position' style={qrPosition}>
                        {qrCodeData && <QRCodePage qrCodeData={qrCodeData} mailinscri={mailinscri} nominscri={nominscri} />}
                    </div>
                </div>
            </div>


        </>
    );
};

export default QRDisplay;
