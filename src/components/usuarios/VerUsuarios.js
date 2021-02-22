import React, { useContext, useEffect } from "react";
import { Table, Tag } from "antd";
import moment from "moment";
import UsuarioContext from "../../context/usuario/usuarioContext";
import "moment/locale/es";
import BotonEliminar from "../layout/extras/BotonEliminar";

function VerUsuarios() {
  // Variables globales de usuarios
  const usuarioContext = useContext(UsuarioContext);
  const {
    nuevocambio,
    usuarios,
    buscarUsuarios,
    activarUsuario,
    eliminarUsuario,
  } = usuarioContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    buscarUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  // Funciones para activar y eliminar usuarios
  const handleActivar = (id) => {
    activarUsuario(id);
  };

  const handleEliminar = (id) => {
    eliminarUsuario(id);
  };

  const columns = [
    {
      title: "Usuario",
      dataIndex: "usuario",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.usuario - b.usuario,
    },
    {
      title: "Inicio usuario",
      dataIndex: "fechainicio",
      key: "fechainicio",
      render: (fechainicio) => moment(fechainicio).format("DD/MM/YYYY"),
    },
    {
      title: "Fin usuario",
      dataIndex: "fechafin",
      key: "fechafin",
      render: (fechafin) => moment(fechafin).format("DD/MM/YYYY"),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado, usuario) => (
        <>
          {estado ? (
            <Tag color="success">ACTIVO</Tag>
          ) : (
            <>
              <Tag
                className="pointer"
                color="red"
                onClick={() => {
                  handleActivar(usuario._id);
                }}
              >
                ACTIVAR
              </Tag>
              <BotonEliminar handleEliminar={handleEliminar} id={usuario._id} />
            </>
          )}
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
