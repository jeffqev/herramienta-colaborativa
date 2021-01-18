import React, { useContext, useEffect } from "react";
import "./registro.css";
import RegistroForm from "./RegistroForm";
import AuthContext from "../../context/auth/authContext";
import Header from "../layout/Header";
import Nav from "../layout/Nav";

function Registro() {
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
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <h2>Gestion de Usuarios</h2>
              <hr />
              <div className="col-md-5">
                <RegistroForm />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Registro;
