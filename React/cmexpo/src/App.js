import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Views/Accueil";
import Inscription from "./Views/Inscription";
import QRCodePage from "./Components/QRDisplay";
import AuthPage from "./Views/AuthPage";
import DashQR from "./Views/Dashboard/DashQR";





function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Accueil />} />
    <Route path="/inscription" element={<Inscription />} />
    <Route path="/qrcode/:userId" element={<QRCodePage />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/auth/Qrscan" element={<DashQR />} />
    
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
