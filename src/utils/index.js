import { toast } from "react-toastify";

// En caso de error retorna el mensaje de error o que no hay conexion
export const errorMsg = (error) => {
  return error.response?.data.msg || "No hay conexion con el servidor";
};

// Muestra los mensajes en toast error o info
export const mostrarMsg = (msg, tipo) => {
  if (tipo === "error") {
    toast.error(msg);
    return;
  }
  toast.info(msg);
};

// Retorna un string con la primera en mayuscula
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
