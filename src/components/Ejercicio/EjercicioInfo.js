import { Col, Row, Typography, Collapse, Tag, Tabs, Alert } from "antd";
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
import MiCalificacion from "./MiCalificacion";
import VerCalificacion from "./VerCalificacion";

function EjercicioInfo({ id }) {
  const { Text } = Typography;
  const { Panel } = Collapse;

  const history = useHistory();
  // Variables globales de ejercicios
  const ejercicioContext = useContext(EjercicioContext);
  const { msg, vaciarmsg, nuevocambio, ejercicio, buscarEjercicioID } =
    ejercicioContext;

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
              <Col style={{ marginTop: 5, marginBottom: 20 }} md={24}></Col>

              <Col md={12} style={{ marginTop: 20 }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>
                        <Text strong>Titulo: </Text>
                      </td>
                      <td>
                        <Text>{capitalize(ejercicio.titulo)}</Text>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Text strong>Descripcion: </Text>
                      </td>
                      <td>
                        <Text>{capitalize(ejercicio.descripcion)} </Text>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Text strong>Dificultad: </Text>
                      </td>
                      <td>
                        <Tag color={setColorDificultad(ejercicio.dificultad)}>
                          {setDificultadText(ejercicio.dificultad)}
                        </Tag>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Text strong>Tema: </Text>
                      </td>
                      <td>
                        <Text>{capitalize(ejercicio.tema?.nombre)}</Text>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col md={12} style={{ marginTop: 2 }}>
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Calificación" key="1">
                    <VerCalificacion idEjercicio={id} />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Mi Calificación" key="2">
                    <MiCalificacion idEjercicio={id} />
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
            <Collapse defaultActiveKey={["1"]}>
              <Panel
                header={<Text strong>Vista previa del ejercicio: </Text>}
                key="1"
              >
                <div style={{ overflowX: "scroll" }}>
                  {htmlParce(listEjercicio(ejercicio, true))}
                </div>
              </Panel>
            </Collapse>
            {!ejercicio.solucion ? (
              <Alert
                style={{ marginBottom: 15, marginTop: 15 }}
                message="No se ha ingresado una solución para este ejercicio"
                type="warning"
                showIcon
                closable
              />
            ) : null}

            {!ejercicio.ejemplo ? (
              <Alert
                style={{ marginBottom: 15, marginTop: 15 }}
                message="No se ha ingresado un ejemplo para este ejercicio"
                type="warning"
                showIcon
                closable
              />
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}

export default EjercicioInfo;

function listEjercicio(e, solution = false) {
  let res = ``;
  // array.forEach((e) => {
  res += `
    <li style="list-style-type: none;">
        <ol>
          <li style="list-style-type: none;">
            
            ${e.ejercicio}

            ${
              e.ejemplo
                ? `
              <p><strong>Ejemplo:</strong></p>
              <table style="border-collapse: collapse; width: 94.1691%; border: 1px solid #dfd6d6;" border="1">
                <tbody>
                  <tr>
                    <td style="width: 98.856%; padding-left: 8px;">${e.ejemplo}</td>
                  </tr>
                </tbody>
              </table>
              <p>&nbsp;</p>
              `
                : ``
            }
            ${
              solution && e.solucion
                ? `
                <p><span style="color: #e03e2d;"><strong>Solución</strong></span></p>
              <table style="border-collapse: collapse; width: 94.1691%; border: 1px solid #dfd6d6; " border="1">
                <tbody>
                  <tr>
                    <td style="width: 98.856%; padding-left: 8px; ">${e.solucion}</td>
                  </tr>
                </tbody>
              </table>
              <p>&nbsp;</p>
              `
                : ``
            }
          </li>
        </ol>
      </li>
    `;
  // });
  return res;
}
