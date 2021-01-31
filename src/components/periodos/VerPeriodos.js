import React, { useContext, useEffect } from "react";
import { Table, Tag, Button } from "antd";
import moment from "moment";
import PeriodoContext from "../../context/periodo/periodoContext";
import "moment/locale/es";
import { DeleteOutlined } from "@ant-design/icons";

function VerPeriodos() {
  // Variables globales de periodos
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
      render: (fechainicio) => moment(fechainicio).format("DD/MM/YYYY"),
    },
    {
      title: "Fin periodo",
      dataIndex: "fechafin",
      key: "fechafin",
      render: (fechafin) => moment(fechafin).format("DD/MM/YYYY"),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado, periodo) => (
        <>
          {estado ? (
            <Tag color="success">ACTIVO</Tag>
          ) : (
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
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={periodos}
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

export default VerPeriodos;
