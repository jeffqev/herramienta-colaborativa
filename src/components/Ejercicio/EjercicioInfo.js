import { Alert, Col, Row, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import htmlParce from "react-html-parser";

import EjercicioContext from "../../context/ejercicio/ejercicioContext";
import { capitalize, mostrarMsg } from "../../utils";
import Calificacion from "./Calificacion";

function EjercicioInfo({ id }) {
  const { Text, Title } = Typography;
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
          <Row style={{ marginBottom: 20 }}>
            <Col
              className="text-center"
              style={{ marginTop: 20, marginBottom: 20 }}
              md={24}
            >
              <Title level={4}>{ejercicio.titulo.toUpperCase()}</Title>
            </Col>
            <Col md={12}>
              <Col md={24}>
                <Text strong>Descripción: </Text>
                <Text>{capitalize(ejercicio.descripcion)} </Text>
              </Col>

              <Col md={24}>
                <Text strong>Dificultad: </Text>
                <Text>{ejercicio.dificultad} </Text>
              </Col>

              <Col md={24}>
                <Text strong>Tema: </Text>
                <Text>{capitalize(ejercicio.tema?.nombre)} </Text>
              </Col>
            </Col>
            <Col md={12}>
              <Calificacion idEjercicio={id} />
            </Col>
          </Row>

          <h4 className="sombra">Ejercicio </h4>

          {htmlParce(ejercicio.ejercicio)}

          {ejercicio.solucion ? (
            <>
              <h4 className="sombra">Solucion </h4>
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

          {ejercicio.ejemplo ? (
            <>
              <h4 className="sombra">Ejemplo </h4>
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
        </>
      ) : null}
    </>
  );
}

export default EjercicioInfo;
