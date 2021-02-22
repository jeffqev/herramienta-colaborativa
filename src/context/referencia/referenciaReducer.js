import {
  REFERENCIA_INGRESO_OK,
  REFERENCIA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  REFERENCIA_BUSCAR_OK,
  REFERENCIA_BUSCAR_ERROR,
  REFERENCIA_ELIMINAR_OK,
  REFERENCIA_ELIMINAR_ERROR,
  REFERENCIA_ASIGNATURA_OK,
  REFERENCIA_ASIGNATURA_ERROR,
} from "../../types";

const referenciaReducer = (state, action) => {
  switch (action.type) {
    case REFERENCIA_INGRESO_OK:
    case REFERENCIA_ELIMINAR_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case REFERENCIA_BUSCAR_OK:
      return {
        ...state,
        referencias: action.payload,
      };

    case REFERENCIA_ASIGNATURA_OK:
      return {
        ...state,
        refasignatura: action.payload,
      };

    case REFERENCIA_BUSCAR_ERROR:
    case REFERENCIA_ASIGNATURA_ERROR:
    case REFERENCIA_INGRESO_ERROR:
    case REFERENCIA_ELIMINAR_ERROR:
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

export default referenciaReducer;
