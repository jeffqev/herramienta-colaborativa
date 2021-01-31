import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:1323",
});

export default clienteAxios;
