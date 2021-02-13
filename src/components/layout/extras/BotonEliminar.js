import React from "react";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { mostrarMsg } from "../../../utils";

function BotonEliminar({ handleEliminar, id }) {
  const handleNoEliminar = () => {
    mostrarMsg("Eliminacion cancelada", "info");
  };

  return (
    <Popconfirm
      title="Esta seguro de querer eliminar"
      okText="Si"
      cancelText="No"
      onConfirm={() => {
        handleEliminar(id);
      }}
      onCancel={handleNoEliminar}
    >
      <DeleteOutlined style={{ color: "#f5222d" }} />
    </Popconfirm>
  );
}

export default BotonEliminar;
