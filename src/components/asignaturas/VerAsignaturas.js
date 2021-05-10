import React, { useContext, useEffect, useState } from "react";
import { Table, Tag, Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
// import { SearchOutlined } from '@ant-design/icons';
import AsignaturaContext from "../../context/asignatura/asignaturaContext";
import CarreraContext from "../../context/carrera/carreraContext";

import { capitalize } from "../../utils";
import BotonEliminar from "../layout/extras/BotonEliminar";
import AsignaturaEditarForm from "./AsignaturaEditarForm";

function VerAsignaturas() {
  // Editar Asignatura
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

  // Datos globales con useContext para usar las asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const {
    nuevocambio,
    asignaturas,
    buscarAsignaturas,
    eliminarAsignatura,
  } = asignaturaContext;

  // Datos globales con useContext para usar los carreras
  const carreraContext = useContext(CarreraContext);
  const { carrerasfiltro, carreranombrefiltro } = carreraContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    buscarAsignaturas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio, carrerasfiltro]);

  const handleEliminar = (id) => {
    eliminarAsignatura(id);
  };

  const handleModificar = (values) => {
    setEditar(values);
    showModal();
  };

  const columns = [
    {
      title: "Codigo",
      dataIndex: "codigo",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.periodo - b.periodo,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      render: (nombre) => capitalize(nombre),
    },
    {
      title: "Carrera",
      dataIndex: "carrera",
      key: "carrera",
      render: (carrera) => capitalize(carrera.carrera),

      filters: carrerasfiltro,
      filterMultiple: false,
      defaultFilteredValue: carreranombrefiltro ? [carreranombrefiltro] : null,
      onFilter: (value, record) => record.carrera.carrera.indexOf(value) === 0,
    },
    {
      title: "Coordinador",
      dataIndex: "coordinador",
      key: "coordinador",
      render: (coordinador) =>
        `${capitalize(coordinador?.nombre)} ${capitalize(
          coordinador?.apellido
        )}`,
    },
    {
      title: "",
      render: (_text, asignaturas) => (
        <>
          <Button
            type="link"
            style={{ padding: 0, marginRight: 5 }}
            shape="round"
            icon={<EditOutlined />}
            size={"small"}
            onClick={() => {
              handleModificar(asignaturas);
            }}
          />
          <BotonEliminar id={asignaturas._id} handleEliminar={handleEliminar} />
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={asignaturas}
        size="small"
        pagination={{ position: ["topCenter"] }}
        showSorterTooltip={false}
        expandable={{
          expandedRowRender: ({ docentes }) => (
            <>
              <p> Docentes </p>
              {docentes.map((docente, i) => (
                <Tag
                  color={i % 2 === 0 ? "geekblue" : "purple"}
                  key={docente._id}
                >
                  {`${capitalize(docente.nombre)} ${capitalize(
                    docente.apellido
                  )}`}
                </Tag>
              ))}
            </>
          ),
        }}
        bordered
        rowKey="_id"
      />

      <Modal
        title="Editar Asignatura"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={345}
      >
        <div className="d-flex justify-content-center">
          {editar ? <AsignaturaEditarForm asignaturaEditar={editar} /> : null}
        </div>
      </Modal>
    </>
  );
}

//

export default VerAsignaturas;
