import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "antd";

import AuthContext from "../../context/auth/authContext";
import { capitalize } from "../../utils";
function Header() {
  const history = useHistory();

  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 text-center"
        href="#!"
      >
        UPS
      </a>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="w-100"></div>
      <ul className="navbar-nav px-3 ">
        <li className="nav-item text-nowrap ">
          {usuario ? (
            <Button
              style={{ color: "#fff" }}
              type={"text"}
              onClick={() => history.push("/perfil")}
            >
              {capitalize(usuario.nombre)} {capitalize(usuario.apellido)}
            </Button>
          ) : null}

          <Button
            style={{ color: "#fff" }}
            type={"text"}
            onClick={() => cerrarSesion()}
          >
            Cerrar sesión
          </Button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
