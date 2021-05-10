import React, { useState, useContext, useEffect } from "react";

import CarreraContext from "../../context/carrera/carreraContext";
import { mostrarMsg } from "../../utils";

function EditarCarrera({ editar }) {
  // State del formulario
  const [carreras, setCarreras] = useState({ carrera: "" });
  const { carrera } = carreras;

  useEffect(() => {
    setCarreras({ carrera: editar.carrera });
  }, [editar]);

  // Variables globales de carreras
  const carreraContext = useContext(CarreraContext);
  const { editarCarrera } = carreraContext;

  // Rellenar el formulario
  const handleChange = (e) => {
    setCarreras({
      ...carreras,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar la peticion y validar campos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (carrera.trim() === "") {
      mostrarMsg("Campos vacio", "error");
      return;
    }

    editarCarrera(editar._id, carreras);
  };

  return (
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
          Editar
        </button>
      </div>
    </form>
  );
}

export default EditarCarrera;
