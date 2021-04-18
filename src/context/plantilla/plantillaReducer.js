import {
  PLANTILLA_INGRESO_OK,
  PLANTILLA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  PLANTILLA_BUSCAR_OK,
  PLANTILLA_BUSCAR_ERROR,
  PLANTILLA_ELIMINAR_OK,
  PLANTILLA_ELIMINAR_ERROR,
  PLANTILLA_ASIG_BUSCAR_OK,
  PLANTILLA_ASIG_BUSCAR_ERROR,
  PLANTILLA_ID_BUSCAR_OK,
  PLANTILLA_ID_BUSCAR_ERROR,
  CARGANDO,
  PLANTILLA_EDITAR_OK,
  PLANTILLA_EDITAR_ERROR,
} from "../../types";

const plantillaReducer = (state, action) => {
  switch (action.type) {
    case PLANTILLA_INGRESO_OK:
    case PLANTILLA_EDITAR_OK:
    case PLANTILLA_ELIMINAR_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case PLANTILLA_BUSCAR_OK:
    case PLANTILLA_ASIG_BUSCAR_OK:
      return {
        ...state,
        plantillas: action.payload,
      };

    case PLANTILLA_ID_BUSCAR_OK:
      return {
        ...state,
        plantilla: action.payload,
      };

    case PLANTILLA_BUSCAR_ERROR:
    case PLANTILLA_INGRESO_ERROR:
    case PLANTILLA_ELIMINAR_ERROR:
    case PLANTILLA_EDITAR_ERROR:
    case PLANTILLA_ID_BUSCAR_ERROR:
    case PLANTILLA_ASIG_BUSCAR_ERROR:
      return {
        ...state,
        msg: action.payload,
      };

    case CARGANDO:
      return {
        ...state,
        cargandoplantilla: action.payload,
        plantilla: {},
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

export default plantillaReducer;
