import React, { useContext, useEffect } from "react";

import { Table, Button, Tag } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import EjercicioContext from "../../context/ejercicio/ejercicioContext";

import BotonEliminar from "../layout/extras/BotonEliminar";
import { capitalize, mostrarMsg } from "../../utils";

import { useHistory } from "react-router";

function VerEjercicio({ idAsignatura }) {
  const history = useHistory();

  // Datos globales con useContext para usar las ejercicio
  const ejercicioContext = useContext(EjercicioContext);
  const {
    ejercicios,
    msg,
    vaciarmsg,
    nuevocambio,
    buscarEjerciciosAsig,
    eliminarEjercicio,
  } = ejercicioContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    buscarEjerciciosAsig(idAsignatura);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  const handleEliminar = (id) => {
    eliminarEjercicio(id);
  };

  const handleVer = (id) => {
    history.push(`/ejercicios/${idAsignatura}/${id}`);
  };

  const handleModificar = (id) => {
    console.log(id);
    // eliminarEjercicio(id);
  };

  const columns = [
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
      render: (titulo) => capitalize(titulo),
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (objetivos) => capitalize(objetivos),
    },
    {
      title: "Dificultad",
      dataIndex: "dificultad",
      key: "dificultad",
      render: (dificultad) => <Tag color={"blue"}>{dificultad}</Tag>,
    },

    {
      title: "Acciones",
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
      dataSource={ejercicios}
      size="small"
      pagination={{ position: ["bottomCenter"] }}
      showSorterTooltip={false}
      bordered
      rowKey="_id"
    />
  );
}

export default VerEjercicio;
