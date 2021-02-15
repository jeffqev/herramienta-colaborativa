import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

import Header from "../layout/Header";
import Nav from "../layout/Nav";
import AntHeader from "../layout/AntHeader";
import VerAsignaturas from "./VerAsignaturas";
import AsignaturaForm from "./AsignaturaForm";

function Usuario() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;
  const history = useHistory();

  useEffect(() => {
    if (usuario) {
      if (usuario?.rol !== "administrador") {
        history.push("/inicio");
      }
    } else {
      usuarioAutenticado();
    }
    // eslint-disable-next-line
  }, [usuarioAutenticado]);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"asignaturas"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <AntHeader
                titulo={"Asignaturas"}
                subtitulo={
                  "Gestionar asignaturas junto a su coordinador y docentes"
                }
              />

              <div className="col-md-3">
                <AsignaturaForm />
              </div>

              <div className="col-md-9">
                <VerAsignaturas />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Usuario;
