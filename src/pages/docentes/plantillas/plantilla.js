import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";
import PlantillaContext from "../../../context/plantilla/plantillaContext";

import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import { capitalize } from "../../../utils";

import Migas from "../../../components/layout/Migas";

import PlantillaInfo from "../../../components/plantillas/PlantillaInfo";

function Plantilla() {
  // Rutas
  const history = useHistory();
  const { id, idplantilla } = useParams();

  // asignatura seleccionada
  const [asignatura, setAsignatura] = useState("");

  // Variables globales usuario logueado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  // Variables globales de plantillas
  const plantillaContext = useContext(PlantillaContext);
  const { nuevocambio, plantilla, buscarPlantillaID } = plantillaContext;

  // Variables globales de asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const { asignaturas, buscarAsignaturasCoordinador } = asignaturaContext;

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
      const busqueda = asignaturas.find((item) => item._id === id);
      if (!busqueda) {
        history.push(`/dashboard`);
      } else {
        setAsignatura(busqueda);
        buscarPlantillaID(idplantilla);
      }
    }

    // eslint-disable-next-line
  }, [nuevocambio]);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"plantillas"} />

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
                    path: "/plantillas/" + id,
                    nombre: "Plantilla",
                  },
                  {
                    path: null,
                    nombre: capitalize(plantilla?.titulo),
                  },
                ]}
              />

              <div className="row">
                <div className="col-md-12 mb-3">
                  <PlantillaInfo id={idplantilla} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Plantilla;
