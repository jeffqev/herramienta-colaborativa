import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
function Header() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#!">
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

      <div className="w-100">
        {usuario ? (
          <span className="ms-3 navbar-text">
            <strong>
              {" "}
              Bienvenido: {usuario.nombre} {usuario.apellido}{" "}
            </strong>
          </span>
        ) : null}
      </div>
      <ul className="navbar-nav px-3 ">
        <li className="nav-item text-nowrap ">
          <button
            className="btn btn-outline-light btn-sm mb-2 mt-2"
            onClick={() => cerrarSesion()}
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
