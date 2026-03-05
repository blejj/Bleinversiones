import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loguearse from "./pages/Login";
import Register from "./pages/Register";
import Inicio from "./pages/Inicio";
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loguearse />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
