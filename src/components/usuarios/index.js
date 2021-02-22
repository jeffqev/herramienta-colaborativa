import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

import Header from "../layout/Header";
import Nav from "../layout/Nav";
import UsuarioForm from "./UsuarioForm";
import VerUsuarios from "./VerUsuarios";
import AntHeader from "../layout/AntHeader";

function Usuarios() {
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
                <UsuarioForm />
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
