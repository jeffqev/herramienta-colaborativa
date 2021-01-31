import React, { useState } from "react";
import { capitalize } from "../../utils";
import { Popconfirm, Drawer, Divider } from "antd";
import { mostrarMsg } from "../../utils";

function CardCarrera({ carrera, eliminarCarrera }) {
  // Configuracion Modal latera
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // Funciones para eliminar carrera
  const handleEliminar = (id) => {
    eliminarCarrera(id);
  };

  const handleNoEliminar = (id) => {
    mostrarMsg("eliminacion cancelada", "info");
  };

  return (
    <>
      <div className="col-md-4 col-sm-6 item mb-4">
        <div className="card card-carrera">
          <div className="card-body d-grid gap-2 ">
            <h4 className="card-title text-left">
              <h5 className="card-title text-center card-title-carrera mb-1">
                {capitalize(carrera.carrera)}
              </h5>
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
            </h4>

            <button
              className="btn btn-outline-info btn-sms"
              onClick={showDrawer}
            >
              Ver Asignaturas
            </button>
          </div>
        </div>
      </div>

      <Drawer
        title="Asignaturas"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <h6 className="text-center"> {capitalize(carrera.carrera)} </h6>
        <Divider>Asignaturas</Divider>
        <ul>
          <li>Programacion</li>
          <li>Base de datos</li>
          <li>Sistemas operativos</li>
        </ul>
      </Drawer>
    </>
  );
}

export default CardCarrera;
