import React, { useReducer } from "react";

import AsignaturaContext from "./asignaturaContext";
import AsignaturaReducer from "./asignaturaReducer";
import clienteAxios from "../../config/axios";
import { errorMsg } from "../../utils";

import {
  ASIGNATURA_INGRESO_OK,
  ASIGNATURA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  ASIGNATURA_BUSCAR_OK,
  ASIGNATURA_BUSCAR_ERROR,
  ASIGNATURA_ELIMINAR_OK,
  ASIGNATURA_ELIMINAR_ERROR,
  ASIGNATURA_DOCENTES_OK,
  ASIGNATURA_DOCENTES_ERROR,
} from "../../types";
import {
  PATH_ASIGNATURA,
  PATH_ASIGNATURA_DOCENTES,
} from "../../config/rutasAPI";

const AsignaturaState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    asignaturas: [],
  };

  const [state, dispatch] = useReducer(AsignaturaReducer, initialState);

  const crearAsignatura = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(PATH_ASIGNATURA, datos);
      dispatch({
        type: ASIGNATURA_INGRESO_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: ASIGNATURA_INGRESO_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarAsignaturas = async () => {
    try {
      const respuesta = await clienteAxios.get(PATH_ASIGNATURA);
      dispatch({
        type: ASIGNATURA_BUSCAR_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: ASIGNATURA_BUSCAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const eliminarAsignatura = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`${PATH_ASIGNATURA}/${id}`);

      dispatch({
        type: ASIGNATURA_ELIMINAR_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: ASIGNATURA_ELIMINAR_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const docentesAsignatura = async (id) => {
    try {
      const respuesta = await clienteAxios.patch(
        `${PATH_ASIGNATURA_DOCENTES}/${id}`
      );

      dispatch({
        type: ASIGNATURA_DOCENTES_OK,
        payload: { texto: respuesta?.data.msg, tipo: "info" },
      });
    } catch (error) {
      dispatch({
        type: ASIGNATURA_DOCENTES_ERROR,
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
    <AsignaturaContext.Provider
      value={{
        msg: state.msg,
        nuevocambio: state.nuevocambio,
        asignaturas: state.asignaturas,
        crearAsignatura,
        buscarAsignaturas,
        eliminarAsignatura,
        docentesAsignatura,
        vaciarmsg,
      }}
    >
      {props.children}
    </AsignaturaContext.Provider>
  );
};

export default AsignaturaState;
