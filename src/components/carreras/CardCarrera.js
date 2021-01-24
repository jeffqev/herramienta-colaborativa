import React from "react";
import { capitalize } from "../../utils";

function CardCarrera({ carrera, eliminarCarrera }) {
  const handleEliminar = (id) => {
    eliminarCarrera(id);
  };

  return (
    <div className="col-md-4 col-sm-6 item mb-4">
      <div className="card">
        <div className="card-body d-grid gap-2 ">
          <h4 className="card-title text-left">
            <button className="btn btn-link cardcarreraeditar">
              <i className="bi bi-gear"></i>
            </button>
            <button
              className="btn btn-link cardcarreraeliminar"
              onClick={() => {
                handleEliminar(carrera._id);
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </h4>
          <h5 className="card-title mb-4">{capitalize(carrera.carrera)}</h5>

          <button className="btn btn-outline-info btn-sms">
            Ver Asignaturas
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCarrera;
