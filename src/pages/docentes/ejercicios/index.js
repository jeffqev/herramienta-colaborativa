import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";

import { Tabs } from "antd";

import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import { capitalize } from "../../../utils";

import Migas from "../../../components/layout/Migas";
import EjercicioForm from "../../../components/Ejercicio/EjercicioForm";
import VerEjercicio from "../../../components/Ejercicio/VerEjercicios";

function Ejercicios() {
  // tabs
  const { TabPane } = Tabs;

  // Rutas
  const history = useHistory();
  const { id } = useParams();

  // asignatura seleccionada
  const [asignatura, setAsignatura] = useState("");
  const [tipo, setTipo] = useState("");
  const [activeTab, setactiveTab] = useState("1");
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
    // Cargar las asignaturas que coordina
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
  }, [nuevocambio]);

  const handleChange = (value) => {
    setactiveTab(value);
  };

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"ejercicios"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
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
                    nombre: "Ejercicios",
                  },
                ]}
              />

              <div className="row">
                <div className="col-md-12 mb-3">
                  <Tabs
                    defaultActiveKey="1"
                    activeKey={activeTab}
                    onChange={handleChange}
                  >
                    <TabPane tab="Listado de ejercicios" key="1" on>
                      <VerEjercicio
                        idAsignatura={id}
                        tipo={tipo}
                        idusuario={usuario._id}
                      />
                    </TabPane>
                    <TabPane tab="Crear nuevo ejercicio" key="2">
                      <EjercicioForm
                        setactiveTab={setactiveTab}
                        idAsignatura={id}
                      />
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

export default Ejercicios;
