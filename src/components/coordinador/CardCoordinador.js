import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { Card, Modal } from "antd";
import { AuditOutlined, UserOutlined, SendOutlined } from "@ant-design/icons";

import DashboardContext from "../../context/dashboard/dashboardContext";

import { capitalize } from "../../utils";
import ModalDocentes from "./ModalDocentes";
const { Meta } = Card;

function CardCoordinador({ asignatura }) {
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
    guardarAsignatura(asignatura._id, "coordinador");
    history.push(`/asignatura/${asignatura._id}`);
  };

  return (
    <>
      <Card
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
      </Card>

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
