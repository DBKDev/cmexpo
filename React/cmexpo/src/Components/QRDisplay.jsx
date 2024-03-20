import React, { useEffect, useState } from 'react';
import QRCodePage from '../Views/QRCodePage'
import InscriptionService from '../Services/InscriptionService';
import { useParams } from 'react-router-dom';
import "../Styles/Badge.css"

const QRDisplay = () => {
    const { userId } = useParams(); // Récupérer l'ID de l'utilisateur depuis les paramètres d'URL
    const [qrCodeData, setQrCodeData] = useState('');


    const fetchQRCodeData = async () => {
        try {
            const response = await InscriptionService.getQRCode(userId);
            console.log(userId);
            console.log("Réponse du service getQRCode :", response);
            console.log(response.data);
            // const compressedData = response.data
            // const inflatedData = pako.inflate(atob(compressedData), { to: 'string' });
            // setQrCodeData(inflatedData);
            const qrCodeData = response.data.data.Code_I;
            setQrCodeData(qrCodeData);

        } catch (error) {
            console.error("Erreur lors de la récupération du code QR :", error);
        }
    };

    useEffect(() => {
        fetchQRCodeData();
    }, [userId]);

    return (
        <>
            <div className='Image-logo'>
                <img src={process.env.PUBLIC_URL + `/images/CMELOGO.svg`} alt='logo cmevenement' />
            </div>


            <div className='positionbadge'>
                <div className='BADGE-LOGO'>
                    <img src={process.env.PUBLIC_URL + `/images/BADGEVIP.png`} alt='BADGEVIP' />
                
                    <div className='qr_position'>
                        {qrCodeData && <QRCodePage qrCodeData={qrCodeData} />}
                    </div>
                </div>
            </div>
        </>

    );
};

export default QRDisplay;
