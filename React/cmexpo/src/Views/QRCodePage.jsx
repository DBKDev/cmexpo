import React from 'react';
import QRCode from 'react-qr-code';
import "../Styles/QRGEN.css"

const QRCodePage = ({ qrCodeData, mailinscri, nominscri }) => {

    console.log("QRDATA DE PAGE ", qrCodeData);

    return (
        <>
            <div className='Infos-Badge'>
                <p>{nominscri}<br />{mailinscri}  </p>
                {/* <p>{nominscri}</p>                    */}
                <QRCode value={qrCodeData} className='QRBADGECODE' />
            </div>
        </>
    );
}

export default QRCodePage;
