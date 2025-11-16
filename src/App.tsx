import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IndicadoresIGO from "./pages/IndicadoresIGO";
import FormacionOnline from "./components/FormacionOnline/FormacionOnline";
import DondeComprar from "./pages/DondeComprar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CalculaOmotenashi from "./pages/CalculaOmotenashi";
import CharlasOmotenashi from "./pages/CharlasOmotenashi";
import BlogExperiencias from "./pages/BlogExperiencias";
import MapaPercepcion from "./pages/MapaPercepcion";
import Header from "./components/Header";
import "./App.css";
import "./styles/layout.css";
import RutaProtegida from './components/RutaProtegida';
import AdminStats from "./pages/AdminStats"; // 👈 nuevo import

function App() {
  const isLoggedIn = localStorage.getItem('usuario') !== null;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/indicadores-igo" element={<IndicadoresIGO />} />
        <Route
  path="/formacion-online"
  element={
    <RutaProtegida>
      <FormacionOnline />
    </RutaProtegida>
  }
/>
        <Route path="/donde-comprar" element={<DondeComprar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calcula-omotenashi" element={<CalculaOmotenashi />} />
        <Route path="/charlas-omotenashi" element={<CharlasOmotenashi />} />
        <Route path="/comunidad-omotenashi" element={<BlogExperiencias />} />
        <Route path="/mapa-percepcion" element={<MapaPercepcion />} />
        <Route path="/admin/stats" element={<AdminStats />} />
      </Routes>
    </Router>
  );
}

export default App;