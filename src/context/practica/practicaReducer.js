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

const practicaReducer = (state, action) => {
  switch (action.type) {
    case PRACTICA_INGRESO_OK:
    case PRACTICA_ELIMINAR_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case PRACTICA_BUSCAR_OK:
      return {
        ...state,
        practicas: action.payload,
      };

    case PRACTICA_ASIG_BUSCAR_OK:
      return {
        ...state,
        practicasAsignatura: action.payload,
      };

    case PRACTICA_ID_BUSCAR_OK:
      return {
        ...state,
        practica: action.payload,
      };

    case PRACTICA_BUSCAR_ERROR:
    case PRACTICA_INGRESO_ERROR:
    case PRACTICA_ELIMINAR_ERROR:
    case PRACTICA_ID_BUSCAR_ERROR:
    case PRACTICA_ASIG_BUSCAR_ERROR:
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

export default practicaReducer;
