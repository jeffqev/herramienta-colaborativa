import React, { useState, useContext, useEffect } from "react";

import CarreraContext from "../../context/carrera/carreraContext";
import { mostrarMsg } from "../../utils";
function CarreraForm() {
  const [carreras, setCarreras] = useState({ carrera: "" });

  const { carrera } = carreras;

  const carreraContext = useContext(CarreraContext);
  const { msg, crearCarrera, vaciarmsg } = carreraContext;

  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  const handleChange = (e) => {
    setCarreras({
      ...carreras,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (carrera.trim() === "") {
      mostrarMsg("Campos vacio", "error");
      return;
    }

    crearCarrera(carreras);
  };

  return (
    <div className="card mt-2">
      <div class="card-header">
        <small>Agregar Nueva Carrera</small>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <label htmlFor="carrera" className="form-label">
            Carrera
          </label>
          <input
            className="form-control"
            id="carrera"
            type="text"
            name="carrera"
            value={carrera}
            placeholder="Nombre"
            onChange={handleChange}
          />

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="mt-3 btn btn-outline-primary btn-block"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarreraForm;
