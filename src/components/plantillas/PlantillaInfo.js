import { Col, Row, Space, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";

import PlantillaContext from "../../context/plantilla/plantillaContext";
import { capitalize, mostrarMsg } from "../../utils";

function PlantillaInfo({ id }) {
  const { Text, Title } = Typography;
  const history = useHistory();
  // Variables globales de plantillas
  const plantillaContext = useContext(PlantillaContext);
  const {
    msg,
    vaciarmsg,
    nuevocambio,
    plantilla,
    buscarPlantillaID,
  } = plantillaContext;

  useEffect(() => {
    if (!msg) {
      buscarPlantillaID(id);
    }

    if (msg?.tipo === "error") {
      mostrarMsg("Practica no existente o ha sido borrada", msg.tipo);
      vaciarmsg();
      history.goBack();
    }
    // eslint-disable-next-line
  }, [nuevocambio, msg, id]);

  return (
    <>
      {plantilla.titulo ? (
        <Row style={{ marginBottom: 20 }}>
          <Col className="text-center" style={{ marginTop: 20 }} md={24}>
            <Title level={4}>{plantilla.titulo.toUpperCase()}</Title>
          </Col>

          <Col md={12}>
            <Text strong>Formato: </Text>
            <Text>{capitalize(plantilla.formato)} </Text>
          </Col>

          <Col md={12}>
            <Text strong>Temas: </Text>
            <Text>{capitalize(plantilla.temas?.nombre)} </Text>
          </Col>

          {/* <Col md={8}>
            <Text strong>Asignatura: </Text>
            <Text>{capitalize(plantilla.asignatura.nombre)} </Text>
          </Col> */}

          <Col md={24} style={{ marginTop: 20 }}>
            <Space direction="vertical">
              <Title level={5} strong>
                Objetivos:
              </Title>

              {plantilla.objetivos.map((objetivo) => (
                <Text key={objetivo}> {`‣ ${objetivo}`} </Text>
              ))}
            </Space>
          </Col>

          <Col md={24} style={{ marginTop: 20 }}>
            <Space direction="vertical">
              <Title level={5} strong>
                Pre-Requisitos:
              </Title>

              {plantilla.requisitos.map((requisito) => (
                <Text key={requisito}> {`‣ ${requisito}`} </Text>
              ))}
            </Space>
          </Col>

          <Col md={24} style={{ marginTop: 20 }}>
            <Space direction="vertical">
              <Title level={5} strong>
                Instrucciones:
              </Title>

              {plantilla.instrucciones.map((instruccion, index) => (
                <Text key={index + 1}> {`${index + 1}.- ${instruccion}`} </Text>
              ))}
            </Space>
          </Col>

          <Col md={24} style={{ marginTop: 20 }}>
            <Space direction="vertical">
              <Title level={5} strong>
                Resultados obtenidos:
              </Title>

              {plantilla.resultados.map((resultado, index) => (
                <Text key={index + 1}> {`${index + 1}.- ${resultado}`} </Text>
              ))}
            </Space>
          </Col>
        </Row>
      ) : null}
    </>
  );
}

export default PlantillaInfo;
