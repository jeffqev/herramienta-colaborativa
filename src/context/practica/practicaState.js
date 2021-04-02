import React, { useReducer } from "react";

import PeridoContext from "./practicaContext";
import PracticaReducer from "./practicaReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  PRACTICA_INGRESO_OK,
  PRACTICA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  PRACTICA_BUSCAR_OK,
  PRACTICA_BUSCAR_ERROR,
  PRACTICA_ELIMINAR_OK,
  PRACTICA_ELIMINAR_ERROR,
  PRACTICA_ASIG_BUSCAR_OK,
  PRACTICA_ASIG_BUSCAR_ERROR,
  PRACTICA_ID_BUSCAR_OK,
  PRACTICA_ID_BUSCAR_ERROR,
} from "../../types";
import { PATH_PRACTICA, PATH_PRACTICA_ASIG } from "../../config/rutasAPI";

const PracticaState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    practicas: [],
    practicasAsignatura: [],
    practica: {},
  };

  const [state, dispatch] = useReducer(PracticaReducer, initialState);

  const crearPractica = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_PRACTICA, datos);
      dispatch({
        type: PRACTICA_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: PRACTICA_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarPracticas = async () => {
    try {
      const respuesta = await clienteAxios.get(PATH_PRACTICA);
      dispatch({
        type: PRACTICA_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: PRACTICA_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarPracticaID = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_PRACTICA}/${id}`);
      dispatch({
        type: PRACTICA_ID_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: PRACTICA_ID_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarPracticasAsig = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_PRACTICA_ASIG}/${id}`);
      dispatch({
        type: PRACTICA_ASIG_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: PRACTICA_ASIG_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarPractica = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_PRACTICA}/${id}`);

      dispatch({
        type: PRACTICA_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: PRACTICA_ELIMINAR_ERROR,
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
        practicas: state.practicas,
        practica: state.practica,
        practicasAsignatura: state.practicasAsignatura,
        crearPractica,
        buscarPracticas,
        eliminarPractica,
        buscarPracticasAsig,
        buscarPracticaID,
        vaciarmsg,
      }}
    >
      {props.children}
    </PeridoContext.Provider>
  );
};

export default PracticaState;
