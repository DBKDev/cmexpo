import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";
import '../../Styles/Administrateur/QR.css'
import NavBarDash from "../../Components/NavBarDash"
import scanSound from '../../Audio/scanner-beep.mp3'


function QrScan() {

    const [scanResult, setScanResult] = useState(null);
    const scannerRef = useRef(null);

    const scanAudio = new Audio(scanSound);

    useEffect(() => {
        scannerRef.current = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 200,
                height: 200,
            },
            fps: 3,
        });

        scannerRef.current.render(succes, error);

        function succes(result) {
            setScanResult(result);
            scanAudio.play();
            setTimeout(() => {
                setScanResult(null); // Réinitialiser scanResult après 1 seconde
            }, 4000);
        }

        function error() {
            console.warn(error);
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
            }
        };

    }, []);

    return (
        <>
        <NavBarDash />
            <div className="page-Qr">
                <div className="Scan-part">
                    <h1>CMAPP Scan Exposant</h1>
                    <div id="reader"></div>
                    {scanResult && <div>Succes : {scanResult}</div>}
                </div>
            </div>
        </>
    );
}

export default QrScan;
