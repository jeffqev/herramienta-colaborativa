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
  DOCENTE_BUSCAR_OK,
  DOCENTE_BUSCAR_ERROR,
  VACIAR_MENSAJE,
  CARGANDO,
} from "../../types";

import { errorMsg } from "../../utils";
import { PATH_USUARIO, PATH_USUARIO_DOCENTES } from "../../config/rutasAPI";

const UsuarioState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    usuariotransfer: [],
    usuarios: [],
    docentes: [],
    cargando: false,
  };

  const [state, dispatch] = useReducer(UsuarioReducer, initialState);

  const crearUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_USUARIO, datos);

      dispatch({
        type: USUARIO_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: USUARIO_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
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
      const respuesta = await clienteAxios.delete(`${PATH_USUARIO}/${id}`);

      dispatch({
        type: USUARIO_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: USUARIO_ELIMINAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarUsuarios = async () => {
    try {
      const respuesta = await clienteAxios.get(PATH_USUARIO);
      dispatch({
        type: USUARIO_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: USUARIO_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarDocentes = async () => {
    try {
      dispatch({
        type: CARGANDO,
        payload: true,
      });

      const respuesta = await clienteAxios.get(PATH_USUARIO_DOCENTES);
      dispatch({
        type: DOCENTE_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: DOCENTE_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        msg: state.msg,
        usuarios: state.usuarios,
        nuevocambio: state.nuevocambio,
        docentes: state.docentes,
        usuariotransfer: state.usuariotransfer,
        crearUsuario,
        buscarUsuarios,
        eliminarUsuario,
        buscarDocentes,
        vaciarmsg,
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioState;
