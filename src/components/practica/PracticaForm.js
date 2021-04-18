import React, { useContext, useEffect, useState } from "react";

import { Button, Col, Row, Select, Table, Tag } from "antd";

import PracticaContext from "../../context/practica/practicaContext";
import PlantillaContext from "../../context/plantilla/plantillaContext";
import EjercicioContext from "../../context/ejercicio/ejercicioContext";

import {
  mostrarMsg,
  capitalize,
  setColorDificultad,
  setDificultadText,
} from "../../utils";
import { EyeOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import Modal from "antd/lib/modal/Modal";
import EjercicioInfo from "../Ejercicio/EjercicioInfo";
import { useHistory } from "react-router";
// import RichText from "./RichTextPDF";

function PracticaForm({ idAsignatura }) {
  const history = useHistory();
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

  // Formularios de antd
  const { Option } = Select;

  // Datos globales con useContext para usar las practicas
  const practicaContext = useContext(PracticaContext);
  const { msg, vaciarmsg, crearPractica } = practicaContext;

  // Datos globales con useContext para usar las plantillas
  const plantillaContext = useContext(PlantillaContext);
  const { plantillas, nuevocambio, buscarPlantillasAsig } = plantillaContext;

  // Datos globales con useContext para ejercicios
  const ejercicioContext = useContext(EjercicioContext);
  const {
    ejerciciosTema: ejercicios,
    nuevocambio: nejercicios,
    buscarEjerciciosPlant,
    vaciarEjerciciosPlant,
  } = ejercicioContext;

  const [idPlantilla, setIDPlantilla] = useState(null);

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
      history.push(`/practicas/${idAsignatura}`);
    }

    buscarPlantillasAsig(idAsignatura);

    console.log(idPlantilla);
    if (idPlantilla !== null) {
      console.log("entro");
      buscarEjerciciosPlant(idPlantilla);
    } else {
      vaciarEjerciciosPlant();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio, nejercicios, idPlantilla]);

  // Manejar plantillas

  const handlePlantilla = (value) => {
    setIDPlantilla(value);
  };

  // Manejar ejercicios

  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [completo, setcompleto] = useState(false);

  const handleVer = (id) => {
    setModalID(id);
    showModal();
  };

  const handleConfirmar = () => {
    if (selectedRowKeys.length === 0) {
      mostrarMsg(`Seleccione almenos 1 ejercicio`, "error");
      return;
    }

    const nuevaPractica = {
      plantilla: idPlantilla,
      ejercicios: selectedRowKeys,
    };
    setcompleto(true);
    crearPractica(nuevaPractica);
  };

  const onSelectChange = (rows) => {
    console.log(rows);
    setselectedRowKeys(rows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: () => ({
      disabled: completo,
    }),
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
      title: "Tema",
      dataIndex: "tema",
      key: "tema",
      render: (tema) => capitalize(tema?.nombre),
    },
    {
      title: "Dificultad",
      dataIndex: "dificultad",
      key: "dificultad",
      render: (dificultad) => (
        <Tag color={setColorDificultad(dificultad)}>
          {setDificultadText(dificultad)}
        </Tag>
      ),
    },
    {
      title: "Veces usado",
      dataIndex: "usado",
      key: "usado",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.usado - b.usado,
      render: (usado) => <Tag color={"blue"}>{usado}</Tag>,
    },

    {
      title: "",
      render: (_text, refasignatura) => (
        <div className="text-center">
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
        </div>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col span={8}>
          <Text>Plantilla </Text>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Seleccione una plantilla"
            onChange={handlePlantilla}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {plantillas.map((plantilla) => (
              <Option key={plantilla._id} value={plantilla._id}>
                {capitalize(plantilla.titulo)}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8} style={{ paddingRight: 20, paddingLeft: 20 }}></Col>
        {idPlantilla !== "" ? (
          <>
            <Col span={8} style={{ marginTop: "auto", textAlign: "right" }}>
              <span style={{ marginLeft: 8, marginRight: 8 }}>
                {`Seleccionados ${selectedRowKeys.length}`}
              </span>
              <Button onClick={handleConfirmar}>Confirmar</Button>
            </Col>
            <Col span={24}>
              <Table
                style={{ marginTop: 20 }}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={ejercicios}
                rowKey="_id"
              />
            </Col>
          </>
        ) : null}
      </Row>

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

export default PracticaForm;
