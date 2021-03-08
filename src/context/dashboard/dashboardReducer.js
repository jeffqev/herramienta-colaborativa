import { GUARDAR_ASIGNATURA } from "../../types";

const periodoReducer = (state, action) => {
  switch (action.type) {
    case GUARDAR_ASIGNATURA:
      return {
        ...state,
        asignaturaid: action.payload.asignatura,
        tipoasignatura: action.payload.tipo,
      };

    default:
      return state;
  }
};

export default periodoReducer;
