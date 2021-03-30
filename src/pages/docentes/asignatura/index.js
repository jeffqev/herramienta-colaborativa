import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";

import Header from "../../../components/layout/Header";
import Migas from "../../../components/layout/Migas";
import Nav from "../../../components/layout/Nav";
import { capitalize } from "../../../utils";
import { Col, Row, Typography } from "antd";
import ModalFloat from "../../../components/CoordinarAsignatura/ModalFloat";

function Inicio() {
  const { Text, Title } = Typography;

  // Rutas
  const history = useHistory();
  const { id } = useParams();

  // asignatura seleccionada
  const [asignatura, setAsignatura] = useState("");
  const [tipo, setTipo] = useState("");

  // Variables globales usuario logueado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  // Variables globales de asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const {
    nuevocambio,
    asignaturas,
    asignaturasDocente,
    buscarAsignaturasCoordinador,
    buscarAsignaturasDocente,
  } = asignaturaContext;

  useEffect(() => {
    if (usuario) {
      if (usuario?.rol === "administrador") {
        history.push("/usuarios");
      }
    } else {
      usuarioAutenticado();
    }

    // Cargar las asignaturas que coordina y las que es docente
    buscarAsignaturasCoordinador();
    buscarAsignaturasDocente();
    // Verificar si es coordinador o docente de dicha asignatura
    if (asignaturas) {
      //Busqueda si es coordinador
      const busqueda = asignaturas.find((asignatura) => asignatura._id === id);
      if (!busqueda) {
        //Busqueda si es docente
        const busquedaDocente = asignaturasDocente.find(
          (asignatura) => asignatura._id === id
        );
        if (!busquedaDocente) {
          history.push(`/dashboard`);
        } else {
          setAsignatura(busquedaDocente);
          setTipo("docente");
        }
      } else {
        setAsignatura(busqueda);
        setTipo("coordinador");
      }
    }

    // eslint-disable-next-line
  }, [usuarioAutenticado, nuevocambio]);

  const rutas = [
    {
      path: "/dashboard",
      nombre: "Dashboard",
    },
    {
      path: null,
      nombre: capitalize(asignatura.nombre),
    },
  ];

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"asignatura"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <Migas rutas={rutas} />
            </div>
            {asignatura.nombre ? (
              <Row
                className="d-flex justify-content-center text-center"
                style={{ marginBottom: 20 }}
              >
                <Col style={{ marginTop: 20 }} md={24}>
                  <Title level={4}>{asignatura?.nombre.toUpperCase()}</Title>

                  <Text>{capitalize(asignatura?.carrera.carrera)} </Text>
                  <br />
                  <Text>Codigo: {capitalize(asignatura?.codigo)} </Text>
                </Col>

                {tipo === "coordinador" ? (
                  <Col md={13}>
                    <ModalFloat asignatura={asignatura} />
                  </Col>
                ) : null}
              </Row>
            ) : null}
          </main>
        </div>
      </div>
    </>
  );
}

export default Inicio;
