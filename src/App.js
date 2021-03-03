import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Usuarios from "./pages/administrador/usuarios";
import Carreras from "./pages/administrador/carreras";
import Periodos from "./pages/administrador/periodos";
import Asignaturas from "./pages/administrador/asignaturas";
import Bienvenida from "./components/inicio";

import Coordinador from "./components/coordinador";
import Practicas from "./components/practicas";
import PracticaForm from "./components/practicas/PracticaForm";
import GestionarPractica from "./components/practicas/GestionarPractica";
import Practica from "./components/practicas/Practica";

import tokenAuth from "./config/token";
import RutaPrivada from "./privado/RutaPrivada";
import Context from "./context";
import NotFound from "./components/layout/NotFound";
import CoordinarAsignatura from "./components/CoordinarAsignatura";
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

          <RutaPrivada
            exact
            path="/coordinador/:id"
            component={CoordinarAsignatura}
          />

          <RutaPrivada exact path="/practicas" component={Practicas} />
          <RutaPrivada exact path="/practicas/:id" component={Practica} />
          <RutaPrivada
            exact
            path="/gestionar/practicas/:id"
            component={PracticaForm}
          />
          <RutaPrivada
            exact
            path="/gestionar/practicas"
            component={GestionarPractica}
          />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </Context>
  );
}

export default App;
