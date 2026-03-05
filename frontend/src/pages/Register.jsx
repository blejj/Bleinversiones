import "./Register.css";
import { useState } from "react";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrarUsuario = async (e) => {
    e.preventDefault();

    const usuario = {
      nombre: nombre,
      email: email,
      passwordHash: password,
    };

    try {
      const response2 = await fetch("http://localhost:5045/api/Usuario");
      const usuariosRegistrados = await response2.json();

      const existeUsuario = usuariosRegistrados.some(
        (u) => u.email === usuario.email,
      );

      if (existeUsuario) {
        alert("Ya existe una cuenta con ese mail. Inicie sesión.");
        return;
      }

      const response = await fetch("http://localhost:5045/api/Usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert("Usuario creado exitosamente.");
        setNombre("");
        setEmail("");
        setPassword("");
      } else {
        alert("Error al crear el usuario.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Registrarse</h2>
          </div>

          <form
            className="login-form"
            id="loginForm"
            noValidate
            onSubmit={registrarUsuario}
          >
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper password-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-btn btn">
              <span className="btn-text">Registrarme</span>
              <span className="btn-loader"></span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
