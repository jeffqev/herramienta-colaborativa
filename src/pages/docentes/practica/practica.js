import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";
import PracticaContext from "../../../context/practica/practicaContext";

import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import { capitalize } from "../../../utils";

import Migas from "../../../components/layout/Migas";
import RichTextPDF from "../../../components/practica/RichTextPDF";
// import EjercicioInfo from "../../../components/Ejercicio/EjercicioInfo";

// import EjercicioInfo from "../../../components/ejercicios/EjercicioInfo";

function Practica() {
  // Rutas
  const history = useHistory();
  const { id, idpractica, tipopractica } = useParams();

  // asignatura seleccionada
  const [asignatura, setAsignatura] = useState("");

  // Variables globales usuario logueado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  // Variables globales de practicas
  const practicaContext = useContext(PracticaContext);
  const { practica, nuevocambio, buscarPracticaID } = practicaContext;

  // Variables globales de asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const {
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
          console.log("entro c");
          setAsignatura(busquedaDocente);
          console.log(practica);
          buscarPracticaID(idpractica);

          // setTipo("docente");
        }
      } else {
        console.log("entro d");
        setAsignatura(busqueda);
        console.log(practica);
        buscarPracticaID(idpractica);
        // setTipo("coordinador");
      }
    }

    // eslint-disable-next-line
  }, [nuevocambio]);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"practicas"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            {/* {practica.plantilla ? ( */}
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
                    path: "/practicas/" + id,
                    nombre: "Practicas",
                  },
                  {
                    path: null,
                    nombre: capitalize(practica?.plantilla?.titulo),
                  },
                ]}
              />

              <div className="row">
                <div className="col-md-12 mb-3">
                  {practica?.plantilla ? (
                    <RichTextPDF
                      requets2={practica}
                      tipopractica={tipopractica}
                      idpractica={idpractica}
                      idAsignatura={id}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            {/* ) : null} */}
          </main>
        </div>
      </div>
    </>
  );
}

export default Practica;
