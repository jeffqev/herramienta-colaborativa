import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { Modal } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";

import DashboardContext from "../../context/dashboard/dashboardContext";

import { capitalize } from "../../utils";
import ModalDocentes from "./ModalDocentes";

function CardCoordinador({ asignatura, tipo, colorcard }) {
  const dashboardContext = useContext(DashboardContext);
  const { guardarAsignatura } = dashboardContext;

  const history = useHistory();

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEnviar = () => {
    guardarAsignatura(asignatura._id, tipo);
    history.push(`/asignatura/${asignatura._id}`);
  };

  return (
    <>
      <div className="col-md-4">
        <div className="card brand-card">
          <div
            className="brand-card-header text-white"
            style={{ backgroundColor: colorcard }}
          >
            <div className="brand-card-title">
              {capitalize(asignatura.nombre)}
            </div>
          </div>
          <div className="brand-card-body">
            <div className="brand-card-item">
              <div className="text-uppercase text-muted small">Docentes</div>
              <UserOutlined key="docente" onClick={showModal} />
            </div>
            <div className="brand-card-item">
              <div className="text-uppercase text-muted small">Ver materia</div>
              <SendOutlined key="enviar" onClick={handleEnviar} />
            </div>
          </div>
        </div>
      </div>
      {/* <Card
        className="colorcord"
        hoverable
        style={{ width: 350, marginRight: 10, marginBottom: 10 }}
        actions={[
          <UserOutlined key="docente" onClick={showModal} />,
          <SendOutlined key="enviar" onClick={handleEnviar} />,
        ]}
      >
        <Meta
          avatar={<AuditOutlined />}
          title={capitalize(asignatura.nombre)}
          description={capitalize(asignatura.carrera.carrera)}
        />
      </Card> */}

      <Modal
        title="Docentes"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        // width={1000}
      >
        <ModalDocentes docente={asignatura.docentes} />
      </Modal>
    </>
  );
}

export default CardCoordinador;
