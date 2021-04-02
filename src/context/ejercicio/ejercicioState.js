import React, { useReducer } from "react";

import PeridoContext from "./ejercicioContext";
import EjercicioReducer from "./ejercicioReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  EJERCICIO_INGRESO_OK,
  EJERCICIO_INGRESO_ERROR,
  VACIAR_MENSAJE,
  EJERCICIO_BUSCAR_OK,
  EJERCICIO_BUSCAR_ERROR,
  EJERCICIO_ELIMINAR_OK,
  EJERCICIO_ELIMINAR_ERROR,
  EJERCICIO_ASIG_BUSCAR_OK,
  EJERCICIO_ASIG_BUSCAR_ERROR,
  EJERCICIO_ID_BUSCAR_OK,
  EJERCICIO_ID_BUSCAR_ERROR,
  CARGANDO,
  EJERCICIO_EDITAR_OK,
  EJERCICIO_EDITAR_ERROR,
  EJERCICIO_PLANT_BUSCAR_OK,
  EJERCICIO_PLANT_BUSCAR_ERROR,
  EJERCICIO_PLANT_VACIAR,
} from "../../types";
import {
  PATH_EJERCICIO,
  PATH_EJERCICIO_ASIG,
  PATH_EJERCICIO_PLANT,
} from "../../config/rutasAPI";

const EjercicioState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    ejercicios: [],
    ejerciciosTema: [],
    temafiltro: [],
    ejercicio: {},
    cargandoejercicio: false,
  };

  const [state, dispatch] = useReducer(EjercicioReducer, initialState);

  const crearEjercicio = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_EJERCICIO, datos);
      dispatch({
        type: EJERCICIO_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: EJERCICIO_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarEjercicios = async () => {
    try {
      const respuesta = await clienteAxios.get(PATH_EJERCICIO);
      dispatch({
        type: EJERCICIO_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: EJERCICIO_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarEjercicioID = async (id) => {
    dispatch({
      type: CARGANDO,
      payload: true,
    });

    try {
      const respuesta = await clienteAxios.get(`${PATH_EJERCICIO}/${id}`);
      dispatch({
        type: EJERCICIO_ID_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: EJERCICIO_ID_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarEjerciciosAsig = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_EJERCICIO_ASIG}/${id}`);
      dispatch({
        type: EJERCICIO_ASIG_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: EJERCICIO_ASIG_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarEjerciciosPlant = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_EJERCICIO_PLANT}/${id}`);
      dispatch({
        type: EJERCICIO_PLANT_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: EJERCICIO_PLANT_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarEjercicio = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_EJERCICIO}/${id}`);

      dispatch({
        type: EJERCICIO_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: EJERCICIO_ELIMINAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const editarEjercicio = async (id, datos) => {
    try {
      const respuesta = await clienteAxios.put(
        `${PATH_EJERCICIO}/${id}`,
        datos
      );

      dispatch({
        type: EJERCICIO_EDITAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: EJERCICIO_EDITAR_ERROR,
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

  const vaciarEjerciciosPlant = async () => {
    dispatch({
      type: EJERCICIO_PLANT_VACIAR,
    });
  };

  return (
    <PeridoContext.Provider
      value={{
        msg: state.msg,
        nuevocambio: state.nuevocambio,
        ejercicios: state.ejercicios,
        ejercicio: state.ejercicio,
        temafiltro: state.temafiltro,
        cargandoejercicio: state.cargandoejercicio,
        ejerciciosTema: state.ejerciciosTema,
        crearEjercicio,
        buscarEjercicios,
        eliminarEjercicio,
        buscarEjerciciosAsig,
        buscarEjercicioID,
        buscarEjerciciosPlant,
        vaciarEjerciciosPlant,
        editarEjercicio,
        vaciarmsg,
      }}
    >
      {props.children}
    </PeridoContext.Provider>
  );
};

export default EjercicioState;
