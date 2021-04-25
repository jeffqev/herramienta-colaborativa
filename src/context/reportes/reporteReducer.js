import {
  REPORTE_CALIFICACIONES_OK,
  REPORTE_CALIFICACIONES_ERROR,
  REPORTE_USOS_OK,
  REPORTE_USOS_ERROR,
  VACIAR_MENSAJE,
} from "../../types";

const reporteReducer = (state, action) => {
  switch (action.type) {
    case REPORTE_USOS_OK:
      return {
        ...state,
        reporteUsos: action.payload,
      };

    case REPORTE_CALIFICACIONES_OK:
      return {
        ...state,
        reporteCalificacion: action.payload,
      };

    case REPORTE_USOS_ERROR:
    case REPORTE_CALIFICACIONES_ERROR:
      return {
        ...state,
        msg: action.payload,
      };

    case VACIAR_MENSAJE:
      return {
        ...state,
        msg: action.payload,
      };

    default:
      return state;
  }
};

export default reporteReducer;
