// import { toast } from "react-toastify";
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
  console.log(error.response);

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
    // toast.error(msg);
    openNotificationWithIcon("error", "Error al realizar la accion", msg);
    return;
  }
  // toast.info(msg);
  openNotificationWithIcon("success", "Accion realizada correctamente", msg);
};

// Retorna un string con la primera en mayuscula
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
