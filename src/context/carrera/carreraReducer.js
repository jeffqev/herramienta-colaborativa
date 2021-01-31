import {
  CARRERA_INGRESO_OK,
  CARRERA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  CARRERA_BUSCAR_OK,
  CARRERA_BUSCAR_ERROR,
  CARRERA_ELIMINAR_OK,
  CARRERA_ELIMINAR_ERROR,
} from "../../types";

const carreraReducer = (state, action) => {
  switch (action.type) {
    case CARRERA_INGRESO_OK:
    case CARRERA_ELIMINAR_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case CARRERA_BUSCAR_OK:
      return {
        ...state,
        carreras: action.payload,
        carrerasfiltro: action.payload.map(function (carrera) {
          return {
            text: carrera.carrera,
            value: carrera.carrera,
          };
        }),
      };

    case CARRERA_BUSCAR_ERROR:
    case CARRERA_INGRESO_ERROR:
    case CARRERA_ELIMINAR_ERROR:
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

export default carreraReducer;
