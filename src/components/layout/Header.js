import React, { useEffect, useContext, useState } from "react";

import { Button } from "antd";

import AuthContext from "../../context/auth/authContext";
import { capitalize } from "../../utils";
import Modal from "antd/lib/modal/Modal";
import Perfil from "../usuarios/Perfil";
function Header() {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <>
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
                onClick={() => showModal()}
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

      <Modal
        title="Mis datos"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={345}
      >
        <div className="d-flex justify-content-center">
          <Perfil />
        </div>
      </Modal>
    </>
  );
}

export default Header;
