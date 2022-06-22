import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";
import EjercicioContext from "../../../context/ejercicio/ejercicioContext";

import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import { capitalize, mostrarMsg } from "../../../utils";

import Migas from "../../../components/layout/Migas";
import EjercicioEditorForm from "../../../components/Ejercicio/EjercicioEditarForm";
import Spinner from "../../../components/layout/extras/Spinner";

function Ejercicio() {
  // Rutas
  const history = useHistory();
  const { id, idejercicio } = useParams();

  // asignatura seleccionada
  const [asignatura, setAsignatura] = useState("");

  // Variables globales usuario logueado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  // Variables globales de ejercicios
  const ejercicioContext = useContext(EjercicioContext);
  const {
    msg,
    nuevocambio,
    ejercicio,
    buscarEjercicioID,
    editarEjercicio,
    vaciarmsg,
  } = ejercicioContext;

  // Variables globales de asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const {
    asignaturas,
    asignaturasDocente,
    buscarAsignaturasCoordinador,
    buscarAsignaturasDocente,
  } = asignaturaContext;

  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

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
      const busqueda = asignaturas.find((item) => item._id === id);
      if (!busqueda) {
        //Busqueda si es docente
        const busquedaDocente = asignaturasDocente.find(
          (item) => item._id === id
        );
        if (!busquedaDocente) {
          history.push(`/dashboard`);
        } else {
          setAsignatura(busquedaDocente);
          buscarEjercicioID(idejercicio);
        }
      } else {
        setAsignatura(busqueda);
        buscarEjercicioID(idejercicio);
      }
    }
  }, [nuevocambio]);

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
                    path: "/ejercicios/" + id,
                    nombre: "Ejercicio",
                  },
                  {
                    path: null,
                    nombre: capitalize(ejercicio?.titulo),
                  },
                ]}
              />
              <div className="row">
                <div className="col-md-12 mb-3">

                  {Object.keys(ejercicio).length !== 0 ? (
                    <EjercicioEditorForm
                      idAsignatura={id}
                      ejercicio={ejercicio}
                      editarEjercicio={editarEjercicio}
                    />
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Ejercicio;
