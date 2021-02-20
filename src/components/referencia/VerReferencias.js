import React, { useContext, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ReferenciaContext from "../../context/referencia/referenciaContext";

import BotonEliminar from "../layout/extras/BotonEliminar";

function VerReferencias({ idAsignatura }) {
  // Datos globales con useContext para usar las referencias
  const referenciaContext = useContext(ReferenciaContext);
  const {
    refasignatura,
    nuevocambio,
    buscarReferenciasAsignatura,
    eliminarReferencia,
  } = referenciaContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    buscarReferenciasAsignatura(idAsignatura);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  const handleEliminar = (id) => {
    eliminarReferencia(id);
  };

  const handleModificar = (id) => {
    console.log(id);
    // eliminarReferencia(id);
  };

  const columns = [
    {
      title: "Referencia",
      dataIndex: "referencia",
      key: "referencia",
    },
    {
      title: "",
      render: (_text, refasignatura) => (
        <>
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
    <>
      <Table
        columns={columns}
        dataSource={refasignatura}
        size="small"
        pagination={{ position: ["bottomCenter"] }}
        showSorterTooltip={false}
        bordered
        rowKey="_id"
      />
    </>
  );
}

//

export default VerReferencias;
