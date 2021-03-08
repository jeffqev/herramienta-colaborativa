import React, { useContext, useEffect } from "react";

import AuthContext from "../../../context/auth/authContext";
import AntHeader from "../../../components/layout/AntHeader";

import Header from "../../../components/layout/Header";
// import Nav from "../../../components/layout/Nav";
import VerCoordinador from "../../../components/coordinador/VerCoordinador";
import { useHistory } from "react-router";

function Coordinador() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  const history = useHistory();
  useEffect(() => {
    if (usuario) {
      if (usuario?.rol === "administrador") {
        history.push("/usuarios");
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
      {/* <Nav activa={"coordinar"} /> */}

      <div className="container-fluid">
        <div className="row">
          <main className="">
            <div className="row">
              <AntHeader
                titulo={"Dashboard"}
                subtitulo={"Asignaturas a las que pertenece"}
              />

              <div className="col-md-12 mt-4">
                <VerCoordinador />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Coordinador;
