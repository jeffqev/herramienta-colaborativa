import React, { useReducer } from "react";

import PeridoContext from "./plantillaContext";
import PlantillaReducer from "./plantillaReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  PLANTILLA_INGRESO_OK,
  PLANTILLA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  PLANTILLA_BUSCAR_OK,
  PLANTILLA_BUSCAR_ERROR,
  PLANTILLA_ELIMINAR_OK,
  PLANTILLA_ELIMINAR_ERROR,
  PLANTILLA_ASIG_BUSCAR_OK,
  PLANTILLA_ASIG_BUSCAR_ERROR,
  PLANTILLA_ID_BUSCAR_OK,
  PLANTILLA_ID_BUSCAR_ERROR,
} from "../../types";
import { PATH_PLANTILLA, PATH_PLANTILLA_ASIG } from "../../config/rutasAPI";

const PlantillaState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    plantillas: [],
    plantilla: {},
  };

  const [state, dispatch] = useReducer(PlantillaReducer, initialState);

  const crearPlantilla = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_PLANTILLA, datos);
      dispatch({
        type: PLANTILLA_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: PLANTILLA_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarPlantillas = async () => {
    try {
      const respuesta = await clienteAxios.get(PATH_PLANTILLA);
      dispatch({
        type: PLANTILLA_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: PLANTILLA_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarPlantillaID = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_PLANTILLA}/${id}`);
      dispatch({
        type: PLANTILLA_ID_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: PLANTILLA_ID_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarPlantillasAsig = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`${PATH_PLANTILLA_ASIG}/${id}`);
      dispatch({
        type: PLANTILLA_ASIG_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: PLANTILLA_ASIG_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarPlantilla = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_PLANTILLA}/${id}`);

      dispatch({
        type: PLANTILLA_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: PLANTILLA_ELIMINAR_ERROR,
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
        plantillas: state.plantillas,
        plantilla: state.plantilla,
        crearPlantilla,
        buscarPlantillas,
        eliminarPlantilla,
        buscarPlantillasAsig,
        buscarPlantillaID,
        vaciarmsg,
      }}
    >
      {props.children}
    </PeridoContext.Provider>
  );
};

export default PlantillaState;
