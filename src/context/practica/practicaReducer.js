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
  CARGANDO,
  LIMPIAR_PRACTICA_CREADA,
} from "../../types";
import { eliminarDuplicado } from "../../utils";

const practicaReducer = (state, action) => {
  switch (action.type) {
    case PRACTICA_INGRESO_OK:
    case PRACTICA_ELIMINAR_OK:
      return {
        ...state,
        msg: action.payload,
        creado: action.payload.id,
        nuevocambio: !state.nuevocambio,
      };

    case LIMPIAR_PRACTICA_CREADA:
      return {
        ...state,
        creado: null,
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
        filtroPeriodo: eliminarDuplicado(
          action.payload.map(function (practica) {
            return {
              text: practica.periodo?.periodo,
              value: practica.periodo?.periodo,
            };
          })
        ),
        filtroPlantilla: eliminarDuplicado(
          action.payload.map(function (practica) {
            return {
              text: practica.plantilla?.titulo,
              value: practica.plantilla?.titulo,
            };
          })
        ),
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

    case CARGANDO:
      return {
        ...state,
        practicasAsignatura: [],
        practica: {},
      };

    default:
      return state;
  }
};

export default practicaReducer;
