import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Views/Accueil";
import Inscription from "./Views/Inscription";
import QRCodePage from "./Components/QRDisplay";
import AuthPage from "./Views/AuthPage";
import QrScan from "./Views/Dashboard/QrScan";
import DashExposant from "./Views/Dashboard/DashExposant";
import DashStat from "./Views/Dashboard/DashStat";





function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Accueil />} />
    <Route path="/inscription" element={<Inscription />} />
    <Route path="/qrcode/:userId" element={<QRCodePage />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/auth/Qrscan" element={<QrScan />} />
    <Route path="/auth/Exposant" element={<DashExposant />} />
    <Route path="/auth/Stats" element={<DashStat />} />
    
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
