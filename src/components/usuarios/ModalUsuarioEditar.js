import React, { useContext, useEffect } from "react";
import { Card, Tabs } from "antd";

import UsuarioContext from "../../context/usuarios/usuarioContext";

import { capitalize } from "../../utils";
import Avatar from "antd/lib/avatar/avatar";

import Meta from "antd/lib/card/Meta";

import DocenteEditar from "./DocenteEditar";
import DocenteEditarPassword from "./DocenteEditarPassword";

function ModalUsuarioEditar({ usuarioEditarID }) {
  // Variables globales de usuarios
  const usuarioContext = useContext(UsuarioContext);
  const {
    usuario: perfil,
    nuevocambio,

    editarUsuario,
    buscarUsuario,
  } = usuarioContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    buscarUsuario(usuarioEditarID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio, usuarioEditarID]);

  // Funciones para activar y eliminar usuarios
  // const handleModificar = (id) => {
  //   alert(id);
  // };

  return (
    <>
      {perfil ? (
        <Card style={{ width: "100%" }}>
          <Meta
            style={{ marginBottom: 30 }}
            avatar={
              <Avatar style={{ color: "#fff", backgroundColor: "#87d068" }}>
                {capitalize(perfil.nombre).charAt(0)}
              </Avatar>
            }
            title={`${capitalize(perfil.nombre)} ${capitalize(
              perfil.apellido
            )}`}
            description={`${perfil.correo}`}
          />

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Editar datos" key="1">
              <DocenteEditar
                usuarioEditar={perfil}
                editarUsuario={editarUsuario}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Contraseña" key="2">
              <DocenteEditarPassword
                usuarioEditar={perfil}
                editarUsuario={editarUsuario}
              />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      ) : null}
    </>
  );
}

//

export default ModalUsuarioEditar;
