import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";

import Header from "../layout/Header";
import Nav from "../layout/Nav";
import PeriodoForm from "./PeriodoForm";
import VerPeriodos from "./VerPeriodos";
import AntHeader from "../layout/AntHeader";

function Usuario() {
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
      <Nav activa={"periodos"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <AntHeader
                titulo={"Periodos"}
                subtitulo={"Gestionar y activar periodos academicos"}
              />

              <div className="col-md-4">
                <PeriodoForm />
              </div>

              <div className="col-md-8">
                <VerPeriodos />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Usuario;
