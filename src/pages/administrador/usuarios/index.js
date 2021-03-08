import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";

import AntHeader from "../../../components/layout/AntHeader";
import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";

import VerUsuarios from "../../../components/usuarios/VerUsuarios";
import DocenteForm from "../../../components/usuarios/DocenteForm";

function Usuarios() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;
  const history = useHistory();

  useEffect(() => {
    if (usuario) {
      if (usuario?.rol !== "administrador") {
        history.push("/dashboard");
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
      <Nav activa={"usuarios"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <AntHeader
                titulo={"Usuarios"}
                subtitulo={"Gestionar usuarios "}
              />

              <div className="col-md-4" style={{ marginTop: 10 }}>
                <div className="card mt-2">
                  <div className="card-header text-center">
                    <small>Agregar nuevo usuario</small>
                  </div>
                  <div className="card-body">
                    <DocenteForm tipo={"administrador"} />
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <VerUsuarios />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Usuarios;
