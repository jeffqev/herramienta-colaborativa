import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";
import AntHeader from "../layout/AntHeader";

import Header from "../layout/Header";
import Nav from "../layout/Nav";

function Inicio() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();

    // eslint-disable-next-line
  }, []);

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={"usuarios"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <AntHeader titulo={"Inicio"} subtitulo={"Bienvenido"} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Inicio;
