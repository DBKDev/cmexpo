import React from 'react';
import QRCode from 'react-qr-code';

const QRCodePage = ({ qrCodeData }) => {
console.log("QRDATA DE PAGE ", qrCodeData);
    return ( 
        <>
            <div>                             
                <QRCode value={qrCodeData} />
            </div>
        </>
     );
}
 
export default QRCodePage;
