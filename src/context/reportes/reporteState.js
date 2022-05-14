import React, { useReducer } from "react";

import ReporteContext from "./reporteContext";
import ReporteReducer from "./reporteReducer";
import clienteAxios from "../../config/axios";
import { capitalize, errorMsg } from "../../utils";

import {
  REPORTE_CALIFICACIONES_OK,
  REPORTE_CALIFICACIONES_ERROR,
  REPORTE_USOS_OK,
  REPORTE_USOS_ERROR,
  CARGANDO,
  VACIAR_MENSAJE,
  REPORTE_TEMAS_OK,
  REPORTE_TEMAS_ERROR,
} from "../../types";
import {
  PATH_REPORTE_CALIFICACION,
  PATH_REPORTE_TEMA,
  PATH_REPORTE_USOS,
} from "../../config/rutasAPI";

const ReporteState = (props) => {
  const initialState = {
    msg: null,
    nuevocambio: false,
    reporteCalificacion: [],
    reporteUsos: [],
    reporteTemas: [],
  };

  const [state, dispatch] = useReducer(ReporteReducer, initialState);

  const buscarReporteCalificacion = async (id) => {
    dispatch({
      type: CARGANDO,
    });

    try {
      const respuesta = await clienteAxios.get(
        `${PATH_REPORTE_CALIFICACION}/${id}`
      );

      dispatch({
        type: REPORTE_CALIFICACIONES_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: REPORTE_CALIFICACIONES_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarReporteUsos = async (id) => {
    dispatch({
      type: CARGANDO,
    });

    try {
      const respuesta = await clienteAxios.get(`${PATH_REPORTE_USOS}/${id}`);

      const formatoGrafica = respuesta?.data.data.map((ejercicio) => {
        return {
          type: capitalize(ejercicio.titulo),
          sales: ejercicio?.usado.length,
        };
      });

      const filtrarnulos = formatoGrafica.filter(
        (ejercicio) => ejercicio?.sales !== 0
      );

      dispatch({
        type: REPORTE_USOS_OK,
        payload: filtrarnulos,
      });
    } catch (error) {
      dispatch({
        type: REPORTE_USOS_ERROR,
        payload: { texto: errorMsg(error), tipo: "error" },
      });
    }
  };

  const buscarReporteTema = async (id) => {
    dispatch({
      type: CARGANDO,
    });

    try {
      const respuesta = await clienteAxios.get(`${PATH_REPORTE_TEMA}/${id}`);

      dispatch({
        type: REPORTE_TEMAS_OK,
        payload: respuesta?.data.data,
      });
    } catch (error) {
      dispatch({
        type: REPORTE_TEMAS_ERROR,
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
    <ReporteContext.Provider
      value={{
        msg: state.msg,
        nuevocambio: state.nuevocambio,
        reporteCalificacion: state.reporteCalificacion,
        reporteUsos: state.reporteUsos,
        reporteTemas: state.reporteTemas,

        buscarReporteCalificacion,
        buscarReporteUsos,
        buscarReporteTema,
        vaciarmsg,
      }}
    >
      {props.children}
    </ReporteContext.Provider>
  );
};

export default ReporteState;
