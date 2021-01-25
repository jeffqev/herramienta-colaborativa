import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";

import UsuarioForm from "./UsuarioForm";
import Header from "../layout/Header";
import Nav from "../layout/Nav";
import UsuarioTable from "./UsuarioTable";
import Titulo from "../layout/Titulo";

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
      <Nav activa={"usuarios"} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <Titulo titulo={"Gestión de usuarios"} />

              <div className="col-md-8 me-4 mb-4">
                <UsuarioTable />
              </div>

              <div className="col-md-3  ">
                <UsuarioForm />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Usuario;
