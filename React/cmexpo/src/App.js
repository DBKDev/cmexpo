import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Views/Accueil";
import Inscription from "./Views/Inscription";
import QRCodePage from "./Components/QRDisplay";






function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Accueil />} />
    <Route path="/inscription" element={<Inscription />} />
    <Route path="/qrcode/:userId" element={<QRCodePage />} />
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
