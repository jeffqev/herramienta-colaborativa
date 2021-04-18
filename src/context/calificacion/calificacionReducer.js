import {
  CALIFICACION_INGRESO_OK,
  CALIFICACION_INGRESO_ERROR,
  VACIAR_MENSAJE,
  CALIFICACION_BUSCAR_OK,
  CALIFICACION_BUSCAR_ERROR,
  CALIFICACION_ELIMINAR_OK,
  CALIFICACION_ELIMINAR_ERROR,
  CALIFICACION_EJER_BUSCAR_OK,
  CALIFICACION_EJER_BUSCAR_ERROR,
  CARGANDO,
} from "../../types";

const calificacionReducer = (state, action) => {
  switch (action.type) {
    case CALIFICACION_INGRESO_OK:
    case CALIFICACION_ELIMINAR_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case CALIFICACION_BUSCAR_OK:
      return {
        ...state,
        calificacion: action.payload,
      };

    case CALIFICACION_EJER_BUSCAR_OK:
      return {
        ...state,
        calificacionesEjercicio: action.payload,
      };

    case CARGANDO:
      return {
        ...state,
        cargandocalificacion: action.payload,
        calificacionesEjercicio: [],
      };

    case CALIFICACION_BUSCAR_ERROR:
    case CALIFICACION_EJER_BUSCAR_ERROR:
    case CALIFICACION_INGRESO_ERROR:
    case CALIFICACION_ELIMINAR_ERROR:
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

export default calificacionReducer;
