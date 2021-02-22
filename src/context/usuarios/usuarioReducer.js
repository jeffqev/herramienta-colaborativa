import {
  USUARIO_INGRESO_OK,
  USUARIO_INGRESO_ERROR,
  USUARIO_BUSCAR_OK,
  USUARIO_BUSCAR_ERROR,
  USUARIO_ELIMINAR_OK,
  USUARIO_ELIMINAR_ERROR,
  DOCENTE_BUSCAR_OK,
  DOCENTE_BUSCAR_ERROR,
  VACIAR_MENSAJE,
  CARGANDO,
} from "../../types";

const usuarioState = (state, action) => {
  switch (action.type) {
    case USUARIO_ELIMINAR_OK:
    case USUARIO_INGRESO_OK:
      return {
        ...state,
        msg: action.payload,
        nuevocambio: !state.nuevocambio,
      };
    case USUARIO_BUSCAR_ERROR:
    case USUARIO_INGRESO_ERROR:
    case USUARIO_ELIMINAR_ERROR:
    case DOCENTE_BUSCAR_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };

    case USUARIO_BUSCAR_OK:
      return {
        ...state,
        usuarios: action.payload,
      };
    case DOCENTE_BUSCAR_OK:
      return {
        ...state,
        docentes: action.payload,
        usuariotransfer: action.payload.map(function (docente) {
          return {
            key: docente._id,
            title: `${docente.nombre} ${docente.apellido}`,
            description: `${docente.nombre} ${docente.apellido}`,
          };
        }),
        cargando: false,
      };
    case VACIAR_MENSAJE:
      return {
        ...state,
        msg: action.payload,
      };

    case CARGANDO:
      return {
        ...state,
        cargando: action.payload,
      };

    default:
      return state;
  }
};

export default usuarioState;
