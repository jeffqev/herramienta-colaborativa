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
export const minAutores = (colaboradores) => {
  return colaboradores.map((colaborador, i, j) => {
    const separado = colaborador.split(" ");
    if (separado.length !== 1) {
      return `${capitalize(separado[1])}, ${capitalize(
        separado[0].charAt(0)
      )}. ${i + 1 === j.length ? "" : "& "} `;
    }
    return `${colaborador}. ${i + 1 === j.length ? "" : "& "}`;
  });
};

export const autoresReferencia = (colaborador) => {
  const separado = colaborador.split(" ");
  if (separado.length !== 1) {
    return `${colaborador}. `;
  }
  return colaborador + ". ";
};

export const stringReferencia = (referencia) => {
  if (referencia.tipo === "libro") {
    return <p>{textReferencia(referencia)}</p>;
  }
  return (
    <>
      {textReferencia(referencia)}
      <a target="_blank" rel="noreferrer" href={referencia.url}>
        [online]
      </a>
    </>
  );
};

export const textReferencia = (referencia) => {
  if (referencia.tipo === "libro") {
    return `${minAutores(referencia.colaboradores).join("")} (${
      referencia.anio ? referencia.anio : "s.f."
    }). ${referencia.titulo} ${
      referencia.edicion ? "(" + referencia.edicion + " ed.)" : ""
    } ${referencia.editorial ? referencia.editorial + "." : ""}`;
  }
  return `${minAutores(referencia.colaboradores).join("")} (${
    referencia.anio ? referencia.anio : "s.f."
  }). ${referencia.titulo}. `;
};

export const eliminarUltimocaracter = (cadena) => {
  return cadena.substring(0, cadena.length - 2);
};

export const eliminarDuplicado = (array) => {
  let hash = {};
  array = array.filter((o) => (hash[o.value] ? false : (hash[o.value] = true)));
  return array;
};

export const obtenerColor = (value) => {
  if (value === 1) {
    return "green";
  }

  if (value === 2) {
    return "#fadb14";
  }

  if (value === 3) {
    return "red";
  }
};

export const setColorDificultad = (value) => {
  if (value === 1) {
    return "green";
  }

  if (value === 2) {
    return "gold";
  }

  if (value === 3) {
    return "red";
  }

  return "blue";
};

export const setDificultadText = (value) => {
  if (value === 1) {
    return "Fácil";
  }

  if (value === 2) {
    return "Medio";
  }

  if (value === 3) {
    return "Difícil";
  }

  return "";
};

export const setTipoEjercicio = (value) => {
  if (value === 0) {
    return { texto: "Practica", color: "blue" };
  }

  if (value === 1) {
    return { texto: "Evaluación", color: "gold" };
  }

  return { texto: "", color: "" };
};

export const setArchivado = (value) => {
  if (value) {
    return "Archivado";
  }

  if (!value) {
    return "Sin Archivar";
  }
};

export const SumPuntaje = (array) => {
  let total = 0;
  for (const i in array) {
    total += array[i].puntaje;
  }
  return total;
};
