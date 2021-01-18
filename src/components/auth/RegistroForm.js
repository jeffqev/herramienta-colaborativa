import React, { useState, useContext, useEffect } from "react";

import AlertaContext from "../../context/alerta/alertaContext";
import AuthContext from "../../context/auth/authContext";
import Alerta from "../layout/Alerta";

function RegistroForm() {

  // State del formulario
  const [usuario, setUsuario] = useState({
    nombre: "jefferson",
    apellido: "ona",
    correo: "adminreact@admin.com",
    contrasena: "admin",
  });

  // Datos globales para usar las alertas con useContext
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  
  // Datos globales con useContext para usar los usuarios
  const authContext = useContext(AuthContext);
  const { registrarUsuario, mensaje } = authContext;

  
  useEffect(() => {

      // En caso se detecte un nuevo mensaje lo mostrara 
      if (mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje])

  // Guardar en los values del formulario el state
  const { nombre, apellido, correo, contrasena } = usuario;

  // Guardar los nuevos datos del formulario en caso de que se escriba algo en el
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || apellido.trim() === "" || correo.trim() === "" || contrasena.trim() === "") {
      mostrarAlerta("todos los campos son requeridos", "danger");

      return;
    }

    registrarUsuario(usuario)

  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              className="form-control"
              id="nombre"
              type="text"
              name="nombre"
              value={nombre}
              placeholder="nombre"
              onChange={handleChange}
            />

            <label htmlFor="nombre" className="form-label">
              Apellido
            </label>
            <input
              className="form-control"
              id="apellido"
              type="text"
              name="apellido"
              value={apellido}
              placeholder="apellido"
              onChange={handleChange}
            />

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
              <button type="submit" className="mt-3 btn btn-primary btn-block">
                Iniciar
              </button>
            </div>
          </form>
        </div>
      </div>
      {alerta ? <Alerta alerta={alerta} /> : null}
    </>
  );
}

export default RegistroForm;
