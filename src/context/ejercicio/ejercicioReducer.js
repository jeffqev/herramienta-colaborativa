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
  CARGANDO,
  EJERCICIO_EDITAR_OK,
  EJERCICIO_EDITAR_ERROR,
  EJERCICIO_PLANT_BUSCAR_OK,
  EJERCICIO_PLANT_VACIAR,
  EJERCICIO_ID_CARGANDO,
} from "../../types";
import { eliminarDuplicado } from "../../utils";

const ejercicioReducer = (state, action) => {
  switch (action.type) {
    case EJERCICIO_INGRESO_OK:
    case EJERCICIO_ELIMINAR_OK:
    case EJERCICIO_EDITAR_OK:
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
        temafiltro: eliminarDuplicado(
          action.payload.map(function (ejercicio) {
            return {
              text: ejercicio.tema?.nombre,
              value: ejercicio.tema?.nombre,
            };
          })
        ),
      };

    case EJERCICIO_PLANT_BUSCAR_OK:
      return {
        ...state,
        ejerciciosTema: action.payload,
      };

    case EJERCICIO_PLANT_VACIAR:
      return {
        ...state,
        ejerciciosTema: [],
      };

    case CARGANDO:
      return {
        ...state,
        cargandoejercicio: action.payload,
        ejercicios: [],
        ejerciciosTema: [],
      };

    case EJERCICIO_ID_CARGANDO:
      return {
        ...state,
        cargandoejercicio: action.payload,
        ejercicio: {},
      };

    case EJERCICIO_ID_BUSCAR_OK:
      return {
        ...state,
        ejercicio: action.payload,
        cargandoejercicio: false,
      };

    case EJERCICIO_BUSCAR_ERROR:
    case EJERCICIO_INGRESO_ERROR:
    case EJERCICIO_ELIMINAR_ERROR:
    case EJERCICIO_ID_BUSCAR_ERROR:
    case EJERCICIO_ASIG_BUSCAR_ERROR:
    case EJERCICIO_EDITAR_ERROR:
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
