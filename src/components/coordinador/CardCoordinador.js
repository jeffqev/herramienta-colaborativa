import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Card, Modal } from "antd";
import { AuditOutlined, UserOutlined, SendOutlined } from "@ant-design/icons";

import { capitalize } from "../../utils";
import ModalDocentes from "./ModalDocentes";
const { Meta } = Card;

function CardCoordinador({ asignatura }) {
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

  return (
    <>
      <Card
        hoverable
        style={{ width: 350, marginRight: 10, marginBottom: 10 }}
        actions={[
          <UserOutlined key="docente" onClick={showModal} />,
          <SendOutlined
            key="enviar"
            onClick={() => history.push(`/coordinador/${asignatura._id}`)}
          />,
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
