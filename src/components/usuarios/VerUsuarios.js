import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Tag, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

import UsuarioContext from "../../context/usuarios/usuarioContext";
import BotonEliminar from "../layout/extras/BotonEliminar";
import { capitalize } from "../../utils";
import ModalUsuarioEditar from "./ModalUsuarioEditar";

function VerUsuarios() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usuarioEditarID, setUsuarioEditarID] = useState("");
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

  // Variables globales de usuarios
  const usuarioContext = useContext(UsuarioContext);
  const {
    nuevocambio,
    usuarios,
    buscarUsuarios,
    eliminarUsuario,
  } = usuarioContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    buscarUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  // Funciones para activar y eliminar usuarios
  const handleModificar = (id) => {
    setUsuarioEditarID(id);
    showModal();
  };

  const handleEliminar = (id) => {
    eliminarUsuario(id);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      render: (nombre, completo) =>
        `${capitalize(nombre)} ${capitalize(completo.apellido)}`,
    },
    {
      title: "Correo",
      dataIndex: "correo",
      key: "correo",
    },
    {
      title: "rol",
      dataIndex: "rol",
      key: "rol",
      render: (rol) => (
        <>
          {rol === "docente" ? (
            <Tag color="orange">Docente</Tag>
          ) : (
            <Tag color="geekblue">Administrador</Tag>
          )}
        </>
      ),
    },
    {
      title: "",
      render: (_, usuario) => (
        <>
          <Button
            type="link"
            style={{ padding: 0, marginRight: 5 }}
            shape="round"
            icon={<EditOutlined />}
            size={"small"}
            onClick={() => {
              handleModificar(usuario._id);
            }}
          />
          <BotonEliminar id={usuario._id} handleEliminar={handleEliminar} />
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={usuarios}
        style={{ marginBottom: 30 }}
        scroll={{ x: "50%" }}
        size="small"
        pagination={{ position: ["topCenter"] }}
        showSorterTooltip={false}
        bordered
        rowKey="_id"
      />

      <Modal
        title="Editar Usuario"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={345}
      >
        <div className="d-flex justify-content-center">
          {usuarioEditarID ? (
            <ModalUsuarioEditar usuarioEditarID={usuarioEditarID} />
          ) : null}
        </div>
      </Modal>
    </>
  );
}

//

export default VerUsuarios;
