import React, { useReducer } from "react";

import UsuarioContext from "./usuarioContext";
import UsuarioReducer from "./usuarioReducer";
import clienteAxios from "../../config/axios";

import {
  USUARIO_INGRESO_OK,
  USUARIO_INGRESO_ERROR,
  USUARIO_BUSCAR_OK,
  USUARIO_BUSCAR_ERROR,
  USUARIO_ELIMINAR_OK,
  USUARIO_ELIMINAR_ERROR,
  VACIAR_MENSAJE,
} from "../../types";

import { errorMsg } from "../../utils";
import {
  CREAR_USUARIO,
  BUSCAR_USUARIOS,
  ELIMINAR_USUARIOS,
} from "../../config/rutasAPI";

const UsuarioState = (props) => {
  const initialState = {
    mensaje: null,
    nuevousuario: false,
    usuarios: [],
  };

  const [state, dispatch] = useReducer(UsuarioReducer, initialState);

  const crearUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(CREAR_USUARIO, datos);

      dispatch({
        type: USUARIO_INGRESO_OK,
        payload: respuesta?.data,
      });
    } catch (error) {
      const alerta = {
        msg: errorMsg(error),
        categoria: "danger",
      };

      dispatch({
        type: USUARIO_INGRESO_ERROR,
        payload: alerta,
      });
    }
  };

  const vaciarmsg = async () => {
    dispatch({
      type: VACIAR_MENSAJE,
      payload: null,
    });
  };
  const eliminarUsuario = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${ELIMINAR_USUARIOS}/${id}`);
      console.log(respuesta.data);

      dispatch({
        type: USUARIO_ELIMINAR_OK,
        payload: respuesta?.data,
      });
    } catch (error) {
      const alerta = {
        msg: errorMsg(error),
        categoria: "danger",
      };

      dispatch({
        type: USUARIO_ELIMINAR_ERROR,
        payload: alerta,
      });
    }
  };

  const buscarUsuarios = async () => {
    try {
      const respuesta = await clienteAxios.get(BUSCAR_USUARIOS);
      dispatch({
        type: USUARIO_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      const alerta = {
        msg: errorMsg(error),
        categoria: "danger",
      };
      console.log(error.response);
      dispatch({
        type: USUARIO_BUSCAR_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        mensaje: state.mensaje,
        usuarios: state.usuarios,
        nuevousuario: state.nuevousuario,
        crearUsuario,
        buscarUsuarios,
        eliminarUsuario,
        vaciarmsg,
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioState;
