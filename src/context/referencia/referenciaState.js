import React, { useReducer } from "react";

import ReferenciaContext from "./referenciaContext";
import ReferenciaReducer from "./referenciaReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  REFERENCIA_INGRESO_OK,
  REFERENCIA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  REFERENCIA_BUSCAR_OK,
  REFERENCIA_BUSCAR_ERROR,
  REFERENCIA_ELIMINAR_OK,
  REFERENCIA_ELIMINAR_ERROR,
  REFERENCIA_ASIGNATURA_OK,
  REFERENCIA_ASIGNATURA_ERROR,
} from "../../types";
import {
  PATH_REFERENCIA,
  PATH_REFERENCIA_ASIGNATURA,
} from "../../config/rutasAPI";

const ReferenciaState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    referencias: [],
    refasignatura: [],
  };

  const [state, dispatch] = useReducer(ReferenciaReducer, initialState);

  const crearReferencia = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_REFERENCIA, datos);
      dispatch({
        type: REFERENCIA_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: REFERENCIA_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarReferencias = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_REFERENCIA}`);
      dispatch({
        type: REFERENCIA_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: REFERENCIA_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarReferenciasAsignatura = async (id) => {
    try {
      const respuesta = await clienteAxios.get(
        `${PATH_REFERENCIA_ASIGNATURA}/${id}`
      );
      dispatch({
        type: REFERENCIA_ASIGNATURA_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: REFERENCIA_ASIGNATURA_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarReferencia = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_REFERENCIA}/${id}`);

      dispatch({
        type: REFERENCIA_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: REFERENCIA_ELIMINAR_ERROR,
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
    <ReferenciaContext.Provider
      value={{
        msg: state.msg,
        nuevocambio: state.nuevocambio,
        referencias: state.referencias,
        refasignatura: state.refasignatura,
        crearReferencia,
        buscarReferencias,
        eliminarReferencia,
        buscarReferenciasAsignatura,
        vaciarmsg,
      }}
    >
      {props.children}
    </ReferenciaContext.Provider>
  );
};

export default ReferenciaState;
