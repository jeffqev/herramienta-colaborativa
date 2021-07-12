import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
// import { SearchOutlined } from '@ant-design/icons';
import TemaContext from "../../context/tema/temaContext";

import { capitalize } from "../../utils";
import BotonEliminar from "../layout/extras/BotonEliminar";
import TemaEditarForm from "./TemaEditarForm";

function VerTemas({ idAsignatura }) {
  // Editar Temas
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editar, setEditar] = useState("");

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

  const handleModificar = (values) => {
    setEditar(values);
    showModal();
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
      render: (nombre) => capitalize(nombre),
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
              handleModificar(temas);
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
        style={{ marginBottom: 30 }}
        scroll={{ x: "50%" }}
        bordered
        rowKey="_id"
      />

      <Modal
        title="Editar Tema"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={345}
      >
        <div className="d-flex justify-content-center">
          {editar ? (
            <TemaEditarForm temaEditar={editar} idAsignatura={idAsignatura} />
          ) : null}
        </div>
      </Modal>
    </>
  );
}

//

export default VerTemas;
