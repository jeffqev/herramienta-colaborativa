import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/auth/Login";
import Usuarios from "./components/usuarios/Usuarios";
import Carreras from "./components/carreras";
import Periodos from "./components/periodos";

import AlertaState from "./context/alerta/alertaState";
import AuthState from "./context/auth/authState";
import UsuarioState from "./context/usuarios/usuarioState";
import CarreraState from "./context/carrera/carreraState";
import PeriodoState from "./context/periodo/periodoState";

import tokenAuth from "./config/token";
import RutaPrivada from "./privado/RutaPrivada";
// Si se encuentra logueado al recargar la pagina
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <AuthState>
      <AlertaState>
        <UsuarioState>
          <CarreraState>
            <PeriodoState>
              <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <RutaPrivada exact path="/usuarios" component={Usuarios} />
                  <RutaPrivada exact path="/carreras" component={Carreras} />
                  <RutaPrivada exact path="/periodos" component={Periodos} />
                </Switch>
              </Router>
            </PeriodoState>
          </CarreraState>
        </UsuarioState>
      </AlertaState>
    </AuthState>
  );
}

export default App;
