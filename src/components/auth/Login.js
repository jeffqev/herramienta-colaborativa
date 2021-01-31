import React, { useState, useContext, useEffect } from "react";
import AlertaContext from "../../context/alerta/alertaContext";
import Alerta from "../layout/Alerta";

import "./login.css";

import AuthContext from "../../context/auth/authContext";

export default function Login(props) {
  // Datos globales con useContext para las alertas
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  // Datos globales con useContext para la informacion de autenticación
  const authaContext = useContext(AuthContext);
  const {
    iniciarSesion,
    usuarioAutenticado,
    autenticado,
    mensaje,
  } = authaContext;

  useEffect(() => {
    // Si cuenta con un token en el localstorage verificar si es uno correcto
    const token = localStorage.getItem("token");
    if (token) {
      usuarioAutenticado();
    }

    // Si autenticado es verdadero cambiar de pagina
    if (autenticado) {
      props.history.push("/usuarios");
    }

    // En caso se detecte un nuevo mensaje lo mostrara
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, props.history]);

  // Inicializar el State del formulario
  const [usuario, setUsuario] = useState({
    correo: "jeff.qev4@gmail.com",
    contrasena: "admin",
  });

  // Guardar en los values del formulario el state
  const { correo, contrasena } = usuario;

  // Guardar los nuevos datos del formulario en caso de que se escriba algo en el
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (correo.trim() === "" || contrasena.trim() === "") {
      mostrarAlerta("todos los campos son requeridos", "danger");
      return;
    }

    iniciarSesion(usuario);
  };

  return (
    <main className="body container">
      <div className="col-md-4 mx-auto">
        <div className="card">
          <div className="card-header">
            <img
              className="img-fluid mx-auto d-block"
              src="https://www.ups.edu.ec/ups_portal-theme/images/ups/home/logo-ups-home.png"
              alt=""
            />
          </div>
          <div className="card-body card-body-login">
            <form onSubmit={handleSubmit}>
              <label htmlFor="correo" className="form-label">
                Correo electronico
              </label>
              <input
                className="form-control"
                id="correo"
                type="email"
                name="correo"
                value={correo}
                placeholder="correo"
                onChange={handleChange}
              />

              <label htmlFor="contrasena" className="form-label">
                Contraseña
              </label>
              <input
                className="form-control"
                id="contrasena"
                type="password"
                value={contrasena}
                name="contrasena"
                placeholder="contrasena"
                onChange={handleChange}
              />

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="mt-3 btn btn-primary btn-block"
                >
                  Iniciar
                </button>
              </div>
            </form>
          </div>
        </div>
        {alerta ? <Alerta alerta={alerta} /> : null}
      </div>
    </main>
  );
}
