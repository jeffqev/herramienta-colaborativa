import React, { useContext, useEffect } from "react";
import { Button, Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";

import UsuarioContext from "../../context/usuarios/usuarioContext";
import BotonEliminar from "../layout/extras/BotonEliminar";
import { capitalize } from "../../utils";

function VerUsuarios() {
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
    alert(id);
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
        size="small"
        pagination={{ position: ["topCenter"] }}
        showSorterTooltip={false}
        bordered
        rowKey="_id"
      />
    </>
  );
}

//

export default VerUsuarios;
