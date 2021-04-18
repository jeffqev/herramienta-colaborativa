import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";

import Login from "./pages/auth/Login";
import Usuarios from "./pages/administrador/usuarios";
import Carreras from "./pages/administrador/carreras";
import Periodos from "./pages/administrador/periodos";
import Asignaturas from "./pages/administrador/asignaturas";
import Asignatura from "./pages/docentes/asignatura";

import Dashboard from "./pages/docentes/dashboard";
import Temas from "./pages/docentes/temas";
import Referencias from "./pages/docentes/referencias";
import Plantillas from "./pages/docentes/plantillas";
import Plantilla from "./pages/docentes/plantillas/plantilla";
import PlantillaEditar from "./pages/docentes/plantillas/plantillaEditar";

import Ejercicios from "./pages/docentes/ejercicios";
import Ejercicio from "./pages/docentes/ejercicios/ejercicio";
import ejercicioEditar from "./pages/docentes/ejercicios/ejercicioEditar";

import Practicas from "./pages/docentes/practica";
import PracticaNueva from "./pages/docentes/practica/practicaNueva";
import Practica from "./pages/docentes/practica/practica";

// import Practicas from "./components/practicas";
// import PracticaForm from "./components/practicas/PracticaForm";
// import GestionarPractica from "./components/practicas/GestionarPractica";
// import Practica from "./components/practicas/Practica";

import tokenAuth from "./config/token";
import RutaPrivada from "./privado/RutaPrivada";
import Context from "./context";
import NotFound from "./components/layout/NotFound";
import Prubas from "./components/Ejercicio/Prubas";

// Si se encuentra logueado al recargar la pagina
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <Context>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <RutaPrivada exact path="/usuarios" component={Usuarios} />
          <RutaPrivada exact path="/carreras" component={Carreras} />
          <RutaPrivada exact path="/periodos" component={Periodos} />
          <RutaPrivada exact path="/asignaturas" component={Asignaturas} />

          <RutaPrivada exact path="/asignatura/:id" component={Asignatura} />
          <RutaPrivada exact path="/dashboard" component={Dashboard} />

          <RutaPrivada exact path="/temas/:id" component={Temas} />
          <RutaPrivada exact path="/referencias/:id" component={Referencias} />
          <RutaPrivada exact path="/plantillas/:id" component={Plantillas} />
          <RutaPrivada
            exact
            path="/plantillas/:id/:idplantilla"
            component={Plantilla}
          />

          <RutaPrivada
            exact
            path="/editar/plantillas/:id/:idplantilla"
            component={PlantillaEditar}
          />

          <RutaPrivada exact path="/ejercicios/:id" component={Ejercicios} />
          <RutaPrivada
            exact
            path="/ejercicios/:id/:idejercicio"
            component={Ejercicio}
          />
          <RutaPrivada
            exact
            path="/editar/ejercicios/:id/:idejercicio"
            component={ejercicioEditar}
          />

          <RutaPrivada exact path="/practicas/:id" component={Practicas} />
          <RutaPrivada
            exact
            path="/nueva/practica/:id"
            component={PracticaNueva}
          />
          <RutaPrivada
            exact
            path="/practica/:id/:idpractica/:tipopractica"
            component={Practica}
          />

          <RutaPrivada exact path="/pruebas" component={Prubas} />
          {/* <RutaPrivada exact path="/practicas" component={Practicas} />
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
          /> */}

          <Route component={NotFound} />
        </Switch>
      </Router>
    </Context>
  );
}

export default App;
