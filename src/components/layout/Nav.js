import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import DashboardContext from "../../context/dashboard/dashboardContext";

function Nav({ activa }) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const dashboardContext = useContext(DashboardContext);
  const { asignaturaid, tipoasignatura } = dashboardContext;

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
                        activa === "asignatura" ? "active" : null
                      }`}
                      to={"/asignatura/" + asignaturaid}
                    >
                      <i className="bi bi-journal-text feather"></i>
                      Asignatura
                    </Link>
                  </li>

                  {/* Si se envio con tipo coordinador mostrar  */}
                  {tipoasignatura === "coordinador" ? (
                    <>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            activa === "plantillas" ? "active" : null
                          }`}
                          to={"/plantillas/" + asignaturaid}
                        >
                          <i className="bi bi-card-heading feather"></i>
                          Plantillas
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            activa === "temas" ? "active" : null
                          }`}
                          to={"/temas/" + asignaturaid}
                        >
                          <i className="bi bi-tags feather"></i>
                          Temas
                        </Link>
                      </li>
                    </>
                  ) : null}

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "referencias" ? "active" : null
                      }`}
                      to={"/referencias/" + asignaturaid}
                    >
                      <i className="bi bi-blockquote-right feather"></i>
                      Referencias
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "ejercicios" ? "active" : null
                      }`}
                      to={"/ejercicios/" + asignaturaid}
                    >
                      <i className="bi bi-file-diff feather"></i>
                      Ejercicios
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activa === "practicas" ? "active" : null
                      }`}
                      to={"/practicas/" + asignaturaid}
                    >
                      <i className="bi bi-files feather"></i>
                      Practicas
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
