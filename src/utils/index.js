import { notification } from "antd";

const openNotificationWithIcon = (type, tittle, msg) => {
  notification[type]({
    message: tittle,
    description: msg,
    placement: "bottomLeft",
  });
};

// En caso de error retorna el mensaje de error o que no hay conexion
export const errorMsg = (error) => {
  if (error.response?.data.msg) {
    return error.response?.data.msg;
  }

  if (error.response?.data.errores) {
    return error.response?.data.errores[0].msg;
  }
  return "Error en el servidor";
};

// Muestra los mensajes en toast error o info
export const mostrarMsg = (msg, tipo) => {
  if (tipo === "error") {
    openNotificationWithIcon("error", "Error al realizar la accion", msg);
    return;
  }

  openNotificationWithIcon("success", "Accion realizada correctamente", msg);
};

// Retorna un string con la primera en mayuscula
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Retorna un string con la primera en mayuscula
export const minAutores = (colaborador) => {
  const separado = colaborador.split(" ");
  if (separado.length !== 1) {
    return `${separado[1]}, ${capitalize(separado[0].charAt(0))}. `;
  }
  return colaborador;
};

export const autoresReferencia = (colaborador) => {
  const separado = colaborador.split(" ");
  if (separado.length !== 1) {
    return `${colaborador}. `;
  }
  return colaborador;
};

export const stringReferencia = (referencia) => {
  if (referencia.tipo === "libro") {
    return (
      <p>
        {`${referencia.colaboradores.map((colaborador) =>
          minAutores(colaborador)
        )} (${referencia.anio ? referencia.anio : "s.f."}). ${
          referencia.titulo
        } ${referencia.edicion ? "(" + referencia.edicion + " ed.)" : ""} ${
          referencia.editorial ? referencia.editorial + "." : ""
        }`}
      </p>
    );
  }
  return (
    <div>
      {`${referencia.colaboradores.map((colaborador) =>
        minAutores(colaborador)
      )} (${referencia.anio ? referencia.anio : "s.f."}). ${
        referencia.titulo
      }. `}
      <a target="_blank" rel="noreferrer" href={referencia.url}>
        [online]
      </a>
    </div>
  );
};
