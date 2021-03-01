import { Col, Row, Space, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import PracticaContext from "../../context/practica/practicaContext";
import { capitalize, mostrarMsg } from "../../utils";

import AntHeader from "../layout/AntHeader";

import Header from "../layout/Header";
import Nav from "../layout/Nav";

function CoordinarAsignatura() {
  const { Text, Title } = Typography;
  // Rutas
  const history = useHistory();
  const { id } = useParams();

  // Variables globales usuario logueado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  // Variables globales de asignaturas
  const practicaContext = useContext(PracticaContext);
  const {
    msg,
    vaciarmsg,
    nuevocambio,
    practica,
    buscarPracticaID,
  } = practicaContext;

  useEffect(() => {
    if (!usuario) {
      usuarioAutenticado();
    }
    // Cargar las asignaturas que coordina
    if (!msg) {
      buscarPracticaID(id);
    }

    if (msg?.tipo === "error") {
      vaciarmsg();
      mostrarMsg("Practica no existente", msg.tipo);
      history.push(`/practicas`);
    }
    // eslint-disable-next-line
  }, [nuevocambio, msg]);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"practicas"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <AntHeader titulo={"Practica"} subtitulo={practica?.titulo} />

              {practica.titulo ? (
                <Row style={{ marginBottom: 20 }}>
                  <Col
                    className="text-center"
                    style={{ marginTop: 20 }}
                    md={24}
                  >
                    <Title level={4}>{practica.titulo.toUpperCase()}</Title>
                  </Col>

                  <Col md={8}>
                    <Text strong>Formato: </Text>
                    <Text>{capitalize(practica.formato)} </Text>
                  </Col>

                  <Col md={8}>
                    <Text strong>Temas: </Text>
                    {practica.temas.map((tema) => (
                      <Text> {`| ${tema.nombre} `} </Text>
                    ))}
                    {" |"}
                  </Col>

                  <Col md={8}>
                    <Text strong>Asignatura: </Text>
                    <Text>{capitalize(practica.asignatura.nombre)} </Text>
                  </Col>

                  <Col md={24} style={{ marginTop: 7 }}>
                    <Text strong>Objetivo: </Text>
                    <Text>{capitalize(practica.objetivo)} </Text>
                  </Col>

                  <Col md={24} style={{ marginTop: 20 }}>
                    <Space direction="vertical">
                      <Title level={5} strong>
                        Pre-Requisitos:
                      </Title>

                      {practica.requisitos.map((requisito, index) => (
                        <Text> {`${index + 1}.- ${requisito}`} </Text>
                      ))}
                    </Space>
                  </Col>

                  <Col md={24} style={{ marginTop: 20 }}>
                    <Space direction="vertical">
                      <Title level={5} strong>
                        Instrucciones:
                      </Title>

                      {practica.instrucciones.map((instruccion, index) => (
                        <Text> {`${index + 1}.- ${instruccion}`} </Text>
                      ))}
                    </Space>
                  </Col>

                  <Col md={24} style={{ marginTop: 20 }}>
                    <Space direction="vertical">
                      <Title level={5} strong>
                        Resultados obtenidos:
                      </Title>

                      {practica.resultados.map((resultado, index) => (
                        <Text> {`${index + 1}.- ${resultado}`} </Text>
                      ))}
                    </Space>
                  </Col>

                  <Col md={24} style={{ marginTop: 20 }}>
                    <Space direction="vertical">
                      <Title level={5} strong>
                        Concluciones:
                      </Title>

                      {practica.concluciones.map((conclucion, index) => (
                        <Text> {`${index + 1}.- ${conclucion}`} </Text>
                      ))}
                    </Space>
                  </Col>
                </Row>
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default CoordinarAsignatura;
