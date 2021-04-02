import { Alert, Col, Row, Typography, Collapse, Tag } from "antd";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import htmlParce from "react-html-parser";

import EjercicioContext from "../../context/ejercicio/ejercicioContext";
import {
  capitalize,
  mostrarMsg,
  setColorDificultad,
  setDificultadText,
} from "../../utils";
import Calificacion from "./Calificacion";

function EjercicioInfo({ id }) {
  const { Text, Title } = Typography;
  const { Panel } = Collapse;

  const history = useHistory();
  // Variables globales de ejercicios
  const ejercicioContext = useContext(EjercicioContext);
  const {
    msg,
    vaciarmsg,
    nuevocambio,
    ejercicio,
    buscarEjercicioID,
  } = ejercicioContext;

  useEffect(() => {
    if (!msg) {
      buscarEjercicioID(id);
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
      {ejercicio.titulo ? (
        <>
          <div className="container">
            <Row style={{ marginBottom: 20 }}>
              <Col
                className="text-center"
                style={{ marginTop: 20, marginBottom: 20 }}
                md={24}
              >
                <Title level={4}>{ejercicio.titulo.toUpperCase()}</Title>
                <Text>{capitalize(ejercicio.descripcion)} </Text>
              </Col>
              <Col md={12} style={{ paddingLeft: 20 }}>
                <Col md={24} style={{ marginTop: 10 }}>
                  <Text>Dificultad: </Text>
                  <Tag
                    style={{ marginLeft: 10 }}
                    color={setColorDificultad(ejercicio.dificultad)}
                  >
                    {setDificultadText(ejercicio.dificultad)}
                  </Tag>
                </Col>

                <Col md={24} style={{ marginTop: 10 }}>
                  <Text>Tema: </Text>
                  <Text style={{ marginLeft: 35 }}>
                    {capitalize(ejercicio.tema?.nombre)}
                  </Text>
                </Col>
              </Col>
              <Col md={12}>
                <Calificacion idEjercicio={id} />
              </Col>
            </Row>

            <Collapse defaultActiveKey={["1", "2", "3"]} ghost>
              <Panel header="Ejercicio" key="1">
                {htmlParce(ejercicio.ejercicio)}
              </Panel>
              <Panel header="Solución" key="2">
                {ejercicio.solucion ? (
                  <>
                    {/* <h4 className="sombra">Solucion </h4> */}
                    {htmlParce(ejercicio.solucion)}
                  </>
                ) : (
                  <Alert
                    style={{ marginBottom: 15, marginTop: 15 }}
                    message="No se ha ingresado una solucion"
                    type="warning"
                    showIcon
                    closable
                  />
                )}
              </Panel>
              <Panel header="Ejemplo" key="3">
                {ejercicio.ejemplo ? (
                  <>
                    {/* <h4 className="sombra">Ejemplo </h4> */}
                    {htmlParce(ejercicio.ejemplo)}
                  </>
                ) : (
                  <Alert
                    style={{ marginBottom: 15, marginTop: 15 }}
                    message="No se ha ingresado un ejemplo"
                    type="warning"
                    showIcon
                    closable
                  />
                )}
              </Panel>
            </Collapse>
          </div>
        </>
      ) : null}
    </>
  );
}

export default EjercicioInfo;
