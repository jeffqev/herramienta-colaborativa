import React from "react";

import { Popconfirm } from "antd";
import { useHistory } from "react-router-dom";

import { capitalize, mostrarMsg } from "../../utils";

function CardCarrera({ carrera, eliminarCarrera, enviaraAsignatura }) {
  // Hook para cambiar de ventana
  const history = useHistory();

  // Funciones para eliminar carrera
  const handleEliminar = (id) => {
    eliminarCarrera(id);
  };

  const handleNoEliminar = () => {
    mostrarMsg("Eliminacion cancelada", "info");
  };

  const handleFiltrar = (carrera) => {
    enviaraAsignatura(carrera);
    history.push("/asignaturas");
  };

  return (
    <>
      <div className="col-md-4 col-sm-6 item mb-4">
        <div className="card card-carrera">
          <div className="card-body d-grid gap-2 ">
            <h5 className="card-title text-left">
              <p className="text-center card-title-carrera mb-1">
                {capitalize(carrera.carrera)}
              </p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-link cardcarreraeditar">
                  <i className="bi bi-gear"></i>
                </button>
                <Popconfirm
                  title="Esta seguro de querer eliminar"
                  okText="Si"
                  cancelText="No"
                  onConfirm={() => {
                    handleEliminar(carrera._id);
                  }}
                  onCancel={handleNoEliminar}
                >
                  <button className="btn btn-link cardcarreraeliminar">
                    <i className="bi bi-trash"></i>
                  </button>
                </Popconfirm>
              </div>
            </h5>

            <button
              className="btn btn-outline-info btn-sms"
              onClick={() => {
                handleFiltrar(carrera.carrera);
              }}
            >
              Ver Asignaturas
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCarrera;
