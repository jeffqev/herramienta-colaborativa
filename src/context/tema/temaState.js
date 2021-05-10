import React, { useReducer } from "react";

import PeridoContext from "./temaContext";
import TemaReducer from "./temaReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  TEMA_INGRESO_OK,
  TEMA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  TEMA_BUSCAR_OK,
  TEMA_BUSCAR_ERROR,
  TEMA_ELIMINAR_OK,
  TEMA_ELIMINAR_ERROR,
  TEMA_PADRE_BUSCAR_OK,
  TEMA_PADRE_BUSCAR_ERROR,
} from "../../types";
import { PATH_TEMA, PATH_TEMA_PADRE } from "../../config/rutasAPI";

const TemaState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    temas: [],
    padres: [],
    padresfiltro: [],
  };

  const [state, dispatch] = useReducer(TemaReducer, initialState);

  const crearTema = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_TEMA, datos);
      dispatch({
        type: TEMA_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: TEMA_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarTemas = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_TEMA}/${id}`);
      dispatch({
        type: TEMA_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: TEMA_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarTemasPadre = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_TEMA_PADRE}/${id}`);
      dispatch({
        type: TEMA_PADRE_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: TEMA_PADRE_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const editarTema = async (id, values) => {
    try {
      const respuesta = await clienteAxios.put(`${PATH_TEMA}/${id}`, values);

      dispatch({
        type: TEMA_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: TEMA_ELIMINAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarTema = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_TEMA}/${id}`);

      dispatch({
        type: TEMA_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: TEMA_ELIMINAR_ERROR,
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

  return (
    <PeridoContext.Provider
      value={{
        msg: state.msg,
        nuevocambio: state.nuevocambio,
        temas: state.temas,
        padres: state.padres,
        padresfiltro: state.padresfiltro,
        crearTema,
        buscarTemas,
        eliminarTema,
        editarTema,
        buscarTemasPadre,
        vaciarmsg,
      }}
    >
      {props.children}
    </PeridoContext.Provider>
  );
};

export default TemaState;
