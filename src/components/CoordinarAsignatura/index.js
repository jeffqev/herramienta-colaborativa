import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import AsignaturaContext from "../../context/asignatura/asignaturaContext";

import { Tabs } from "antd";

import AntHeader from "../layout/AntHeader";

import Header from "../layout/Header";
import Nav from "../layout/Nav";
import { capitalize } from "../../utils";
import TemaForm from "./TemaForm";
import VerTemas from "./VerTemas";
import VerTemasPadre from "./VerTemasPadre";

function CoordinarAsignatura() {
  // tabs
  const { TabPane } = Tabs;

  // Rutas
  const history = useHistory();
  const { id } = useParams();

  // asignatura seleccionada
  const [asignatura, setAsignatura] = useState("");

  // Variables globales usuario logueado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  // Variables globales de asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const {
    nuevocambio,
    asignaturas,
    buscarAsignaturasCoordinador,
  } = asignaturaContext;

  useEffect(() => {
    if (!usuario) {
      usuarioAutenticado();
    }

    // Cargar las asignaturas que coordina
    buscarAsignaturasCoordinador();

    // Verificar si es coordinador de dicha asignatura
    if (asignaturas) {
      const busqueda = asignaturas.find((asignatura) => asignatura._id === id);
      if (!busqueda) {
        history.push(`/coordinador`);
      } else {
        setAsignatura(busqueda);
      }
    }

    // eslint-disable-next-line
  }, [nuevocambio]);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"coordinar"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <AntHeader
                titulo={capitalize(asignatura.nombre)}
                subtitulo={""}
              />
              <div className="col-md-3" style={{ marginTop: 40 }}>
                <TemaForm idAsignatura={id} />
              </div>
              <div className="col-md-9">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Temas" key="1">
                    <VerTemas idAsignatura={id} />
                  </TabPane>
                  <TabPane tab="Temas padres" key="2">
                    <VerTemasPadre idAsignatura={id} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default CoordinarAsignatura;
