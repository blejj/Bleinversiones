import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Loguearse() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loguearUsuario = async (e) => {
    e.preventDefault();

    const userLogin = {
        Email: email,
        Password: password
    }

    try {
      // 2️⃣ Recién acá crear usuario
      const response = await fetch("http://localhost:5045/api/Login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombre", data.nombre);
        navigate("/inicio");
      } else {
        const msg = await response.text(); //guardamos el mensaje de error por las dudas.
        console.log("Error del backend:", msg);
        alert("Credenciales incorrectas!");
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
            <h2>Iniciar Sesión</h2>
          </div>

          <form
            className="login-form"
            id="loginForm"
            noValidate
            onSubmit={loguearUsuario}
          >
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
              <span className="btn-text">Iniciar Sesión</span>
              <span className="btn-loader"></span>
            </button>

            <p className="register-link">
              ¿No tenés cuenta? <Link to="/Register">Registrate</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Loguearse;
