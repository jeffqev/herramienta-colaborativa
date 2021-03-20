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
} from "../../types";

const ejercicioReducer = (state, action) => {
  switch (action.type) {
    case EJERCICIO_INGRESO_OK:
    case EJERCICIO_ELIMINAR_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case EJERCICIO_BUSCAR_OK:
    case EJERCICIO_ASIG_BUSCAR_OK:
      return {
        ...state,
        ejercicios: action.payload,
      };

    case EJERCICIO_ID_BUSCAR_OK:
      return {
        ...state,
        ejercicio: action.payload,
      };

    case EJERCICIO_BUSCAR_ERROR:
    case EJERCICIO_INGRESO_ERROR:
    case EJERCICIO_ELIMINAR_ERROR:
    case EJERCICIO_ID_BUSCAR_ERROR:
    case EJERCICIO_ASIG_BUSCAR_ERROR:
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

export default ejercicioReducer;
