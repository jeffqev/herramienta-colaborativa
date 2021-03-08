import {
  TEMA_INGRESO_OK,
  TEMA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  TEMA_BUSCAR_OK,
  TEMA_BUSCAR_ERROR,
  TEMA_ELIMINAR_OK,
  TEMA_ELIMINAR_ERROR,
  TEMA_PADRE_BUSCAR_OK,
  TEMA_PADRE_BUSCAR_ERROR,
} from "../../types";

const temaReducer = (state, action) => {
  switch (action.type) {
    case TEMA_INGRESO_OK:
    case TEMA_ELIMINAR_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case TEMA_BUSCAR_OK:
      return {
        ...state,
        temas: action.payload,
        padresfiltro: action.payload.map(function (padre) {
          return {
            text: padre.nombre,
            value: padre.nombre,
          };
        }),
      };

    case TEMA_PADRE_BUSCAR_OK:
      return {
        ...state,
        padres: action.payload,
      };

    case TEMA_BUSCAR_ERROR:
    case TEMA_INGRESO_ERROR:
    case TEMA_ELIMINAR_ERROR:
    case TEMA_PADRE_BUSCAR_ERROR:
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

export default temaReducer;
