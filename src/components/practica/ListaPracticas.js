import React, { useContext, useEffect, useState } from "react";
import { Button, Collapse, Popconfirm, Space, Table } from "antd";
import { useHistory } from "react-router-dom";

import PracticaContext from "../../context/practica/practicaContext";
import {
  DeleteOutlined,
  FilePdfOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { capitalize, mostrarMsg } from "../../utils";

import moment from "moment";
import "moment/locale/es";
import Modal from "antd/lib/modal/Modal";
import EjercicioInfo from "../Ejercicio/EjercicioInfo";

function ListadoPracticas({ idAsignatura, tipo }) {
  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalID, setModalID] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleVerEjercicio = (id) => {
    setModalID(id);
    showModal();
  };

  const practicaContext = useContext(PracticaContext);
  const {
    msg,
    nuevocambio,
    filtroPlantilla,
    practicasAsignatura: data,
    buscarPracticasAsig,
    eliminarPractica,
    vaciarmsg,
  } = practicaContext;

  useEffect(() => {
    buscarPracticasAsig();
    if (msg) {
      vaciarmsg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  const history = useHistory();

  const downloadPDF = (item, tipodescarga) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/practica/pdf/${item._id}/${tipodescarga}`
    ).then((response) => {
      if (!response.ok) {
        mostrarMsg("Error al generar el pdf", "error");
        return;
      }
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = `${capitalize(item.plantilla.titulo)} ${
          item.periodo.periodo
        }${tipodescarga === "solucion" ? " con soluciones" : ""}.pdf`;
        a.click();
      });
    });
  };

  const handleEliminar = (id) => {
    eliminarPractica(id);
  };

  const columns = [
    {
      title: "Periodo",
      dataIndex: "periodo",
      key: "periodo",
      render: (periodo) => periodo?.periodo,
      sorter: (a, b) => a.periodo?.periodo - b.periodo?.periodo,
    },
    {
      title: "Plantilla",
      dataIndex: "plantilla",
      key: "plantilla",
      render: (plantilla) => capitalize(plantilla?.titulo),

      filters: filtroPlantilla,
      filterMultiple: false,
      onFilter: (value, record) =>
        record.plantilla?.titulo.indexOf(value) === 0,
    },
    {
      title: "Creado",
      dataIndex: "creado",
      key: "creado",
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.creado).unix() - moment(b.creado).unix(),

      render: (creado) => moment(creado).format("LL"),
    },
    {
      title: "Lista de ejercicios",
      dataIndex: "ejercicios",
      key: "ejercicios",
      render: (ejercicios) => (
        <>
          <Collapse ghost>
            <Collapse.Panel header={definirNumeroEjercicios(ejercicios)}>
              <Space direction="vertical">
                {ejercicios.map((ejercicio) => (
                  <Button
                    key={ejercicio._id}
                    type="link"
                    shape="round"
                    size={"small"}
                    onClick={() => {
                      handleVerEjercicio(ejercicio._id);
                    }}
                  >
                    {capitalize(ejercicio?.titulo)}
                  </Button>
                ))}
              </Space>
            </Collapse.Panel>
          </Collapse>
        </>
      ),
    },
    {
      title: "Acciones",
      render: (_text, refasignatura) => (
        <>
          {tipo === "coordinador" && !refasignatura?.final ? (
            <Button
              type="link"
              style={{ color: "#237804" }}
              shape="round"
              icon={<EditOutlined />}
              size={"small"}
              onClick={() => {
                history.push(
                  `/practica/${idAsignatura}/${refasignatura._id}/normal`
                );
              }}
            >
              Confirmar practica
            </Button>
          ) : null}

          {refasignatura?.final ? (
            <Button
              type="link"
              shape="round"
              icon={<FilePdfOutlined />}
              size={"small"}
              onClick={() => {
                downloadPDF(refasignatura, "normal");
              }}
            >
              Descargar practica
            </Button>
          ) : null}

          <br />
          {tipo === "coordinador" && !refasignatura?.finalSolucion ? (
            <Button
              type="link"
              style={{ color: "#237804" }}
              shape="round"
              icon={<EditOutlined />}
              size={"small"}
              onClick={() => {
                history.push(
                  `/practica/${idAsignatura}/${refasignatura._id}/solucion`
                );
              }}
            >
              Confirmar practica con soluciones
            </Button>
          ) : null}

          {refasignatura?.finalSolucion ? (
            <Button
              type="link"
              shape="round"
              icon={<FilePdfOutlined />}
              size={"small"}
              onClick={() => {
                downloadPDF(refasignatura, "solucion");
              }}
            >
              Descargar practica con soluciones
            </Button>
          ) : null}

          {tipo === "coordinador" ? (
            <>
              <br />
              <Popconfirm
                title="Esta seguro de querer eliminar"
                okText="Si"
                cancelText="No"
                onConfirm={() => {
                  handleEliminar(refasignatura._id);
                }}
              >
                <Button
                  type="link"
                  danger
                  shape="round"
                  icon={<DeleteOutlined />}
                  size={"small"}
                >
                  Eliminar practica
                </Button>
              </Popconfirm>
            </>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <>
      {tipo === "coordinador" ? (
        <Button
          onClick={() => history.push(`/nueva/practica/` + idAsignatura)}
          block
          type="default"
        >
          Nueva practica
        </Button>
      ) : null}

      <Table
        columns={columns}
        style={{ marginTop: 10, marginBottom: 30 }}
        dataSource={data.filter(
          (practica) => practica?.plantilla.asignatura === idAsignatura
        )}
        size="small"
        pagination={{ position: ["bottomCenter"] }}
        showSorterTooltip={false}
        bordered
        rowKey="_id"
        scroll={{ x: "50%" }}
      />

      <Modal
        title="Ejercicio"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        {modalID ? <EjercicioInfo id={modalID} /> : null}
      </Modal>
    </>
  );
}

export default ListadoPracticas;

const definirNumeroEjercicios = (ejercicios) => {
  const num = ejercicios.length;
  return ` ${num} ${num === 1 ? "Ejercicio" : "Ejercicios"}`;

};
