import React, { useContext, useEffect } from "react";
import { Table, Tag, Button } from "antd";
import moment from "moment";
import PeriodoContext from "../../context/periodo/periodoContext";
import "moment/locale/es";
import { DeleteOutlined } from "@ant-design/icons";

function VerPeriodos() {
  // Variables globales de carreras
  const periodoContext = useContext(PeriodoContext);
  const {
    nuevocambio,
    periodos,
    buscarPeriodos,
    activarPeriodo,
    eliminarPeriodo,
  } = periodoContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    buscarPeriodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  // Funciones para activar y eliminar periodos
  const handleActivar = (id) => {
    activarPeriodo(id);
  };

  const handleEliminar = (id) => {
    eliminarPeriodo(id);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={periodoArreglo(periodos, handleActivar, handleEliminar)}
        size="small"
        pagination={{ position: ["topCenter"] }}
        showSorterTooltip={false}
        bordered
      />
    </>
  );
}

// Columna de las tabla
const columns = [
  {
    title: "Periodo",
    dataIndex: "periodo",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.periodo - b.periodo,
  },
  {
    title: "Inicio periodo",
    dataIndex: "fechainicio",
    key: "fechainicio",
  },
  {
    title: "Fin periodo",
    dataIndex: "fechafin",
    key: "fechafin",
  },
  {
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
  },
];

// Retorna un arreglo con las fechas formateadas
const periodoArreglo = (periodos, handleActivar, handleEliminar) => {
  return periodos.map((periodo) => {
    return {
      key: periodo._id,
      fechainicio: moment(periodo.fechainicio).format("DD/MM/YYYY"),
      fechafin: moment(periodo.fechafin).format("DD/MM/YYYY"),
      periodo: periodo.periodo,
      estado: estadoTipo(periodo, handleActivar, handleEliminar),
    };
  });
};

// Retorna el estado del periodo activo o activar
const estadoTipo = (periodo, handleActivar, handleEliminar) => {
  if (periodo.estado) {
    return <Tag color="success">ACTIVO</Tag>;
  }
  return (
    <>
      <Tag
        className="pointer"
        color="red"
        onClick={() => {
          handleActivar(periodo._id);
        }}
      >
        ACTIVAR
      </Tag>
      <Button
        type="link"
        danger
        shape="round"
        icon={<DeleteOutlined />}
        size={"small"}
        onClick={() => {
          handleEliminar(periodo._id);
        }}
      />
    </>
  );
};

//

export default VerPeriodos;
