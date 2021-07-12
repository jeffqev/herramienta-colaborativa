import { Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CarreraContext from "../../context/carrera/carreraContext";

import CardCarrera from "./CardCarrera";
import EditarCarrera from "./EditarCarrera";

function VerCarreras() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editar, setEditar] = useState("");

  // Modal editar
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditar = (id) => {
    setEditar(id);
    showModal();
  };

  const carreraContext = useContext(CarreraContext);
  const {
    nuevocambio,
    carreras,
    buscarCarreras,
    eliminarCarrera,
    enviaraAsignatura,
  } = carreraContext;

  useEffect(() => {
    buscarCarreras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  return (
    <>
      {carreras.map((carrera) => (
        <CardCarrera
          key={carrera._id}
          carrera={carrera}
          eliminarCarrera={eliminarCarrera}
          enviaraAsignatura={enviaraAsignatura}
          handleEditar={handleEditar}
        />
      ))}
      <Modal
        title="Editar Carrera"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={345}
      >
        <div className="d-flex justify-content-center">
          {editar ? <EditarCarrera editar={editar} /> : null}
        </div>
      </Modal>
    </>
  );
}

export default VerCarreras;
