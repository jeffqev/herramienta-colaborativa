import React, { useContext, useEffect } from "react";

import { Table, Button, Tag } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import PlantillaContext from "../../context/plantilla/plantillaContext";

import BotonEliminar from "../layout/extras/BotonEliminar";
import { capitalize, mostrarMsg } from "../../utils";

import { useHistory } from "react-router";

function VerPlantilla({ idAsignatura }) {
  // Modal

  const history = useHistory();

  // Datos globales con useContext para usar las plantilla
  const plantillaContext = useContext(PlantillaContext);
  const {
    plantillas,
    msg,
    vaciarmsg,
    nuevocambio,
    buscarPlantillasAsig,
    eliminarPlantilla,
  } = plantillaContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    buscarPlantillasAsig(idAsignatura);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio]);

  const handleEliminar = (id) => {
    eliminarPlantilla(id);
  };

  const handleVer = (id) => {
    history.push(`/plantillas/${idAsignatura}/${id}`);
  };

  const handleModificar = (id) => {
    history.push(`/editar/plantillas/${idAsignatura}/${id}`);
    // eliminarPlantilla(id);
  };

  const columns = [
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
      render: (titulo) => capitalize(titulo),
    },
    {
      title: "Objetivo principal",
      dataIndex: "objetivos",
      key: "objetivos",
      render: (objetivos) => capitalize(objetivos[0]),
    },
    {
      title: "Temas",
      dataIndex: "temas",
      key: "temas",
      render: (tema) => <Tag color={"purple"}>{capitalize(tema?.nombre)}</Tag>,
    },
    {
      title: "",
      render: (_text, refasignatura) => (
        <>
          <Button
            type="link"
            style={{ padding: 0, marginRight: 5 }}
            shape="round"
            icon={<EyeOutlined />}
            size={"small"}
            onClick={() => {
              handleVer(refasignatura._id);
            }}
          />

          <Button
            type="link"
            style={{ padding: 0, marginRight: 5 }}
            shape="round"
            icon={<EditOutlined />}
            size={"small"}
            onClick={() => {
              handleModificar(refasignatura._id);
            }}
          />
          <BotonEliminar
            id={refasignatura._id}
            handleEliminar={handleEliminar}
          />
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={plantillas}
      size="small"
      pagination={{ position: ["bottomCenter"] }}
      showSorterTooltip={false}
      bordered
      style={{ marginBottom: 30 }}
      scroll={{ x: "50%" }}
      rowKey="_id"
    />
  );
}

//

export default VerPlantilla;
