import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { toast } from "react-toastify";
import { Button } from "antd";

function Header() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  const perfilUsuario = () => {
    console.log("xd");
    toast.success("Wow so easy !");
  };

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

      <div className="w-100">
        {usuario ? (
          <span className="ms-3" style={{ color: "#fff" }}>
            Bienvenido: {usuario.nombre} {usuario.apellido}
          </span>
        ) : null}
      </div>
      <ul className="navbar-nav px-3 ">
        <li className="nav-item text-nowrap ">
          <Button
            style={{ color: "#fff" }}
            type={"text"}
            onClick={() => perfilUsuario()}
          >
            Perfil
          </Button>
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
