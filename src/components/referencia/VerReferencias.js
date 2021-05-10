import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Tag, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ReferenciaContext from "../../context/referencia/referenciaContext";

import BotonEliminar from "../layout/extras/BotonEliminar";
import { autoresReferencia, stringReferencia } from "../../utils";
import ReferenciaEditarForm from "./ReferenciaEditarForm";

function VerReferencias({ idAsignatura }) {
  // Editar referencia
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

  const handleModificar = (values) => {
    setEditar(values);
    showModal();
  };

  const columns = [
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Autores",
      dataIndex: "colaboradores",
      key: "colaboradores",
      render: (colaboradores) => {
        return colaboradores.map((colaborador) =>
          autoresReferencia(colaborador)
        );
      },
    },
    {
      title: "Publicación",
      dataIndex: "anio",
      key: "anio",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      render: (rol) => (
        <>
          {rol === "libro" ? (
            <Tag color="purple">Libro</Tag>
          ) : (
            <Tag color="geekblue">Web</Tag>
          )}
        </>
      ),
    },
    {
      title: "Acciones",
      render: (_text, refasignatura) => (
        <>
          <Button
            type="link"
            style={{ padding: 0, marginRight: 5 }}
            shape="round"
            icon={<EditOutlined />}
            size={"small"}
            onClick={() => {
              handleModificar(refasignatura);
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
        expandable={{
          expandedRowRender: (referencia) => stringReferencia(referencia),
        }}
      />

      <Modal
        title="Editar Referencia"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={345}
      >
        <div className="d-flex justify-content-center">
          {editar ? (
            <ReferenciaEditarForm
              referenciaEditar={editar}
              idAsignatura={idAsignatura}
            />
          ) : null}
        </div>
      </Modal>
    </>
  );
}

//

export default VerReferencias;
