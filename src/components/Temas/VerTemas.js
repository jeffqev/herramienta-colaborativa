import React, { useContext, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
// import { SearchOutlined } from '@ant-design/icons';
import TemaContext from "../../context/tema/temaContext";

import { capitalize } from "../../utils";
import BotonEliminar from "../layout/extras/BotonEliminar";

function VerTemas({ idAsignatura }) {
  // Datos globales con useContext para usar las temas
  const temaContext = useContext(TemaContext);
  const {
    padresfiltro,
    nuevocambio,
    temas,
    buscarTemas,
    buscarTemasPadre,
    eliminarTema,
  } = temaContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    buscarTemas(idAsignatura);
    buscarTemasPadre(idAsignatura);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  const handleEliminar = (id) => {
    eliminarTema(id);
  };

  const handleModificar = (id) => {
    console.log(id);
    // eliminarTema(id);
  };

  const columns = [
    {
      title: "Número",
      dataIndex: "numero",
      key: "numero",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.numero - b.numero,
    },

    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Padre",
      dataIndex: "padre",
      key: "padre",
      render: (padre) => capitalize(padre?.nombre),

      filters: padresfiltro,
      filterMultiple: false,
      onFilter: (value, record) => record.padre?.nombre.indexOf(value) === 0,
    },
    {
      title: "",
      render: (_text, temas) => (
        <>
          <Button
            type="link"
            style={{ padding: 0, marginRight: 5 }}
            shape="round"
            icon={<EditOutlined />}
            size={"small"}
            onClick={() => {
              handleModificar(temas._id);
            }}
          />
          <BotonEliminar id={temas._id} handleEliminar={handleEliminar} />
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={temas}
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

export default VerTemas;
