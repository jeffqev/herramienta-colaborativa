import clienteAxios from "./axios";

const tokenAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["Authorization"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["Authorization"];
    window.location.replace("/");
  }
};

export default tokenAuth;
