import React, { useState } from "react";

import { Fab, Action } from "react-tiny-fab";
import { Modal } from "antd";
import "react-tiny-fab/dist/styles.css";
import {
  PlusOutlined,
  UserAddOutlined,
  DiffOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import ModalFloat from "./ModalFloat";

function FloatButton({ asignatura }) {
  // Modal Docentes
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
      <Fab
        mainButtonStyles={{ color: "white", backgroundColor: "#1890ff" }}
        icon={<PlusOutlined style={{ fontSize: 25 }} />}
        alwaysShowTitle={true}
      >
        <Action
          text="Docentes"
          style={{ color: "white", backgroundColor: "#85a5ff" }}
          onClick={showModal}
        >
          <UserAddOutlined style={{ fontSize: 20 }} />
        </Action>

        <Action
          text="Practicas"
          style={{ color: "white", backgroundColor: "#85a5ff" }}
          onClick={() => {
            alert("1");
          }}
        >
          <AuditOutlined style={{ fontSize: 20 }} />
        </Action>

        <Action
          text="Ejercicios"
          style={{ color: "white", backgroundColor: "#85a5ff" }}
          onClick={() => {
            alert("1");
          }}
        >
          <DiffOutlined style={{ fontSize: 20 }} />
        </Action>
      </Fab>

      <Modal
        title="Docentes"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalFloat asignatura={asignatura} />
      </Modal>
    </>
  );
}

export default FloatButton;
