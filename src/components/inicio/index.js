import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";

import Header from "../layout/Header";
import Migas from "../layout/Migas";
import Nav from "../layout/Nav";

function Inicio() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();

    // eslint-disable-next-line
  }, []);

  const rutas = [
    {
      path: "/inicio",
      nombre: "Home",
    },
    {
      path: "/practicas",
      nombre: "Practicas",
    },
    {
      path: null,
      nombre: "Practicas",
    },
  ];

  if (!usuario) return null;

  return (
    <>
      <Header />
      <Nav activa={""} />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="row">
              <Migas rutas={rutas} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Inicio;
