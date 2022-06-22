import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import AsignaturaContext from "../../context/asignatura/asignaturaContext";

import AntHeader from "../layout/AntHeader";

import Header from "../layout/Header";
import Nav from "../layout/Nav";
import { capitalize } from "../../utils";
import Formulario from "./Formulario";

function PracticaForm() {
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
      const busqueda = asignaturas.find((item) => item._id === id);
      if (!busqueda) {
        history.push(`/gestionar/practicas`);
      } else {
        setAsignatura(busqueda);
      }
    }
  }, [nuevocambio]);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"practicas"} />
      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <AntHeader
                titulo={capitalize(asignatura.nombre)}
                subtitulo={"Agregar practica"}
              />
              <div className="row">
                <Formulario idAsignatura={id} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default PracticaForm;
