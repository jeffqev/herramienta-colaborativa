import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";

import { Tabs } from "antd";

import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import { capitalize } from "../../../utils";

import FloatButton from "../../../components/CoordinarAsignatura/FloatButton";
import ReferenciaForm from "../../../components/referencia/ReferenciaForm";
import VerReferencias from "../../../components/referencia/VerReferencias";
import Migas from "../../../components/layout/Migas";

function Referencias() {
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
    if (usuario) {
      if (usuario?.rol !== "docente") {
        history.push("/usuarios");
      }
    } else {
      usuarioAutenticado();
    }
    // Cargar las asignaturas que coordina
    buscarAsignaturasCoordinador();

    // Verificar si es coordinador de dicha asignatura
    if (asignaturas) {
      const busqueda = asignaturas.find((asignatura) => asignatura._id === id);
      if (!busqueda) {
        history.push(`/dashboard`);
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
      <Nav activa={"referencias"} />
      <FloatButton asignatura={asignatura} />
      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              {/* <AntHeader
                titulo={capitalize(asignatura.nombre)}
                subtitulo={""}
              /> */}
              <Migas
                rutas={[
                  {
                    path: "/dashboard",
                    nombre: "Dashboard",
                  },
                  {
                    path: "/asignatura/" + asignatura._id,
                    nombre: capitalize(asignatura.nombre),
                  },
                  {
                    path: null,
                    nombre: "Referencias",
                  },
                ]}
              />

              <div className="row">
                <div className="col-md-3" style={{ marginTop: 45 }}>
                  <div className="card  mt-3">
                    <div className="card-header">
                      <small>Agregar nueva referencia</small>
                    </div>
                    <div className="card-body">
                      <ReferenciaForm idAsignatura={id} />
                    </div>
                  </div>
                </div>
                <div className="col-md-9 mb-3">
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Referencias" key="1">
                      <VerReferencias idAsignatura={id} />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Referencias;
