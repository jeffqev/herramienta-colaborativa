import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/auth/Login";
import Usuarios from "./components/usuarios/Usuarios";
import Carreras from "./components/carreras";
import Periodos from "./components/periodos";
import Asignaturas from "./components/asignaturas";
import Bienvenida from "./components/inicio";
import Coordinador from "./components/coordinador";

import tokenAuth from "./config/token";
import RutaPrivada from "./privado/RutaPrivada";
import Context from "./context";
import NotFound from "./components/layout/NotFound";
// Si se encuentra logueado al recargar la pagina
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <Context>
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
          <RutaPrivada exact path="/asignaturas" component={Asignaturas} />

          <RutaPrivada exact path="/inicio" component={Bienvenida} />
          <RutaPrivada exact path="/coordinador" component={Coordinador} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </Context>
  );
}

export default App;
