import { toast } from "react-toastify";

export const errorMsg = (error) => {
  return error.response?.data.msg || "No hay conexion con el servidor";
};

export const mostrarMsg = (msg, tipo) => {
  if (tipo === "error") {
    toast.error(msg);
    return;
  }
  toast.info(msg);
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
