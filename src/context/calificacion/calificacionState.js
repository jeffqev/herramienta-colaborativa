import React, { useReducer } from "react";

import CalificacionContext from "./calificacionContext";
import CalificacionReducer from "./calificacionReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  CALIFICACION_INGRESO_OK,
  CALIFICACION_INGRESO_ERROR,
  VACIAR_MENSAJE,
  CALIFICACION_BUSCAR_OK,
  CALIFICACION_BUSCAR_ERROR,
  CALIFICACION_ELIMINAR_OK,
  CALIFICACION_ELIMINAR_ERROR,
  CALIFICACION_EJER_BUSCAR_ERROR,
  CALIFICACION_EJER_BUSCAR_OK,
  CARGANDO,
} from "../../types";
import {
  PATH_CALIFICACION,
  PATH_CALIFICACION_EJER,
} from "../../config/rutasAPI";

const CalificacionState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    calificacion: [],
    calificacionesEjercicio: [],
    cargandocalificacion: false,
  };

  const [state, dispatch] = useReducer(CalificacionReducer, initialState);

  const crearCalificacion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_CALIFICACION, datos);
      dispatch({
        type: CALIFICACION_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: CALIFICACION_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarCalificaciones = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_CALIFICACION}/${id}`);
      dispatch({
        type: CALIFICACION_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: CALIFICACION_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarCalificacionEjercicio = async (id) => {
    try {
      dispatch({
        type: CARGANDO,
      });

      const respuesta = await clienteAxios.get(
        `${PATH_CALIFICACION_EJER}/${id}`
      );
      dispatch({
        type: CALIFICACION_EJER_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: CALIFICACION_EJER_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarCalificacion = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_CALIFICACION}/${id}`);

      dispatch({
        type: CALIFICACION_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: CALIFICACION_ELIMINAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const editarCalificacion = async (id, values) => {
    try {
      const respuesta = await clienteAxios.put(
        `${PATH_CALIFICACION}/${id}`,
        values
      );
      dispatch({
        type: CALIFICACION_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: CALIFICACION_ELIMINAR_ERROR,
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
    <CalificacionContext.Provider
      value={{
        msg: state.msg,
        nuevocambio: state.nuevocambio,
        calificacion: state.calificacion,
        calificacionesEjercicio: state.calificacionesEjercicio,
        cargandocalificacion: state.cargandocalificacion,
        crearCalificacion,
        buscarCalificaciones,
        eliminarCalificacion,
        editarCalificacion,
        buscarCalificacionEjercicio,
        vaciarmsg,
      }}
    >
      {props.children}
    </CalificacionContext.Provider>
  );
};

export default CalificacionState;
