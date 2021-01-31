import {
  USUARIO_INGRESO_OK,
  USUARIO_INGRESO_ERROR,
  USUARIO_BUSCAR_OK,
  USUARIO_BUSCAR_ERROR,
  USUARIO_ELIMINAR_OK,
  USUARIO_ELIMINAR_ERROR,
  VACIAR_MENSAJE,
} from "../../types";

const usuarioState = (state, action) => {
  switch (action.type) {
    case USUARIO_ELIMINAR_OK:
    case USUARIO_INGRESO_OK:
      return {
        ...state,
        nuevousuario: !state.nuevousuario,
        mensaje: {
          msg: action.payload.msg,
          categoria: "success",
        },
      };
    case USUARIO_BUSCAR_ERROR:
    case USUARIO_INGRESO_ERROR:
    case USUARIO_ELIMINAR_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };

    case USUARIO_BUSCAR_OK:
      return {
        ...state,
        usuarios: action.payload,
      };

    case VACIAR_MENSAJE:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};

export default usuarioState;
