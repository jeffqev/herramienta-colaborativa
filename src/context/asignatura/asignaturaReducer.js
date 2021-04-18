import {
  ASIGNATURA_INGRESO_OK,
  ASIGNATURA_INGRESO_ERROR,
  VACIAR_MENSAJE,
  ASIGNATURA_BUSCAR_OK,
  ASIGNATURA_BUSCAR_ERROR,
  ASIGNATURA_ELIMINAR_OK,
  ASIGNATURA_ELIMINAR_ERROR,
  ASIGNATURA_DOCENTES_OK,
  ASIGNATURA_DOCENTES_ERROR,
  ASIGNATURAS_COORDINADOR_OK,
  ASIGNATURAS_COORDINADOR_ERROR,
  ASIGNATURAS_PERTENECE_OK,
  ASIGNATURAS_PERTENECE_ERROR,
} from "../../types";

const asignaturaReducer = (state, action) => {
  switch (action.type) {
    case ASIGNATURA_INGRESO_OK:
    case ASIGNATURA_ELIMINAR_OK:
    case ASIGNATURA_DOCENTES_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };

    case ASIGNATURA_BUSCAR_OK:
    case ASIGNATURAS_COORDINADOR_OK:
      return {
        ...state,
        asignaturas: action.payload,
      };
    case ASIGNATURAS_PERTENECE_OK:
      return {
        ...state,
        asignaturasDocente: action.payload,
      };

    case ASIGNATURA_BUSCAR_ERROR:
    case ASIGNATURA_INGRESO_ERROR:
    case ASIGNATURA_ELIMINAR_ERROR:
    case ASIGNATURA_DOCENTES_ERROR:
    case ASIGNATURAS_COORDINADOR_ERROR:
    case ASIGNATURAS_PERTENECE_ERROR:
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

export default asignaturaReducer;
