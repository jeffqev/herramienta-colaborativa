import {
  PERIODO_INGRESO_OK,
  PERIODO_INGRESO_ERROR,
  VACIAR_MENSAJE,
  PERIODO_BUSCAR_OK,
  PERIODO_BUSCAR_ERROR,
  PERIODO_ELIMINAR_OK,
  PERIODO_ELIMINAR_ERROR,
  PERIODO_ACTIVAR_OK,
  PERIODO_ACTIVAR_ERROR,
} from "../../types";

const periodoReducer = (state, action) => {
  switch (action.type) {
    case PERIODO_INGRESO_OK:
    case PERIODO_ELIMINAR_OK:
    case PERIODO_ACTIVAR_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case PERIODO_BUSCAR_OK:
      return {
        ...state,
        periodos: action.payload,
      };

    case PERIODO_BUSCAR_ERROR:
    case PERIODO_INGRESO_ERROR:
    case PERIODO_ELIMINAR_ERROR:
    case PERIODO_ACTIVAR_ERROR:
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

export default periodoReducer;
