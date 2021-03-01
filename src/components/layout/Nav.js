import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function Nav({ activa }) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div className=" pt-3">
            {usuario.rol === "administrador" ? (
              <>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Administración</span>
                </h6>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "usuarios" ? "active" : null
                      }`}
                      to={"/usuarios"}
                    >
                      {/* <span data-feather="users"></span> */}
                      <i className="bi bi-people feather"></i>
                      Usuarios
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "carreras" ? "active" : null
                      }`}
                      to={"/carreras"}
                    >
                      <i className="bi bi-book feather"></i>
                      Carreras
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "periodos" ? "active" : null
                      }`}
                      to={"/periodos"}
                    >
                      <i className="bi bi-calendar-date feather"></i>
                      Periodos
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "asignaturas" ? "active" : null
                      }`}
                      to={"/asignaturas"}
                    >
                      <i className="bi bi-journal-text feather"></i>
                      Asignaturas
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Menu</span>
                </h6>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "coordinar" ? "active" : null
                      }`}
                      to={"/coordinador"}
                    >
                      <i className="bi bi-journal-text feather"></i>
                      Asignaturas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "practicas" ? "active" : null
                      }`}
                      to={"/practicas"}
                    >
                      <i className="bi bi-files feather"></i>
                      Practicas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "ejercicios" ? "active" : null
                      }`}
                      to={"/ejercicios"}
                    >
                      <i className="bi bi-file-diff feather"></i>
                      Ejercicios
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
