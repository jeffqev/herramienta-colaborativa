import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table, Tag } from "antd";
import moment from "moment";
import PeriodoContext from "../../context/periodo/periodoContext";
import "moment/locale/es";
import BotonEliminar from "../layout/extras/BotonEliminar";
import { EditOutlined } from "@ant-design/icons";
import EditarPeriodoForm from "./EditarPeriodoForm";

function VerPeriodos() {
  // Editar Periodo
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

  const handleModificar = (values) => {
    setEditar(values);
    showModal();
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
                style={{ padding: 0, marginRight: 5 }}
                shape="round"
                icon={<EditOutlined />}
                size={"small"}
                onClick={() => {
                  handleModificar(periodo);
                }}
              />

              <BotonEliminar handleEliminar={handleEliminar} id={periodo._id} />
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
        style={{ marginBottom: 30 }}
        scroll={{ x: "50%" }}
        size="small"
        pagination={{ position: ["topCenter"] }}
        showSorterTooltip={false}
        bordered
        rowKey="_id"
      />

      <Modal
        title="Editar Periodo"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={345}
      >
        <div className="d-flex justify-content-center">
          {editar ? <EditarPeriodoForm periodo={editar} /> : null}
        </div>
      </Modal>
    </>
  );
}

//

export default VerPeriodos;
