import React, { useReducer } from "react";

import CarreraContext from "./carreraContext";
import CarreraReducer from "./carreraReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  CARRERA_INGRESO_OK,
  CARRERA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  CARRERA_BUSCAR_OK,
  CARRERA_BUSCAR_ERROR,
  CARRERA_ELIMINAR_OK,
  CARRERA_ELIMINAR_ERROR,
  ENVIAR_ASIGNATURA,
  QUITAR_ASIGNATURA,
} from "../../types";
import { PATH_CARRERA } from "../../config/rutasAPI";

const CarreraState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    carreras: [],
    carrerasfiltro: [],
    carreranombrefiltro: null,
  };

  const [state, dispatch] = useReducer(CarreraReducer, initialState);

  const crearCarrera = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_CARRERA, datos);
      dispatch({
        type: CARRERA_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: CARRERA_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarCarreras = async () => {
    try {
      const respuesta = await clienteAxios.get(PATH_CARRERA);
      dispatch({
        type: CARRERA_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: CARRERA_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const editarCarrera = async (id, values) => {
    try {
      const respuesta = await clienteAxios.put(`${PATH_CARRERA}/${id}`, values);

      dispatch({
        type: CARRERA_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: CARRERA_ELIMINAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarCarrera = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_CARRERA}/${id}`);

      dispatch({
        type: CARRERA_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: CARRERA_ELIMINAR_ERROR,
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

  const enviaraAsignatura = async (carrera) => {
    dispatch({
      type: ENVIAR_ASIGNATURA,
      payload: carrera,
    });

    setTimeout(() => {
      dispatch({
        type: QUITAR_ASIGNATURA,
        payload: null,
      });
    }, 3000);
  };

  return (
    <CarreraContext.Provider
      value={{
        msg: state.msg,
        nuevocambio: state.nuevocambio,
        carreras: state.carreras,
        carrerasfiltro: state.carrerasfiltro,
        carreranombrefiltro: state.carreranombrefiltro,
        crearCarrera,
        buscarCarreras,
        eliminarCarrera,
        editarCarrera,
        vaciarmsg,
        enviaraAsignatura,
      }}
    >
      {props.children}
    </CarreraContext.Provider>
  );
};

export default CarreraState;
