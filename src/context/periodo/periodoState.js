import React, { useReducer } from "react";

import PeridoContext from "./periodoContext";
import PeriodoReducer from "./periodoReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  PERIODO_INGRESO_OK,
  PERIODO_INGRESO_ERROR,
  VACIAR_MENSAJE,
  PERIODO_BUSCAR_OK,
  PERIODO_BUSCAR_ERROR,
  PERIODO_ELIMINAR_OK,
  PERIODO_ELIMINAR_ERROR,
  PERIODO_ACTIVAR_OK,
  PERIODO_ACTIVAR_ERROR,
} from "../../types";
import { PATH_PERIODO } from "../../config/rutasAPI";

const PeriodoState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    periodos: [],
  };

  const [state, dispatch] = useReducer(PeriodoReducer, initialState);

  const crearPeriodo = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_PERIODO, datos);
      dispatch({
        type: PERIODO_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: PERIODO_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarPeriodos = async () => {
    try {
      const respuesta = await clienteAxios.get(PATH_PERIODO);
      dispatch({
        type: PERIODO_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: PERIODO_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarPeriodo = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_PERIODO}/${id}`);

      dispatch({
        type: PERIODO_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: PERIODO_ELIMINAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const activarPeriodo = async (id) => {
    try {
      const respuesta = await clienteAxios.patch(`${PATH_PERIODO}/${id}`);

      dispatch({
        type: PERIODO_ACTIVAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: PERIODO_ACTIVAR_ERROR,
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
        periodos: state.periodos,
        crearPeriodo,
        buscarPeriodos,
        eliminarPeriodo,
        activarPeriodo,
        vaciarmsg,
      }}
    >
      {props.children}
    </PeridoContext.Provider>
  );
};

export default PeriodoState;
