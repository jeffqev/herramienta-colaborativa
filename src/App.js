import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import AlertaState from "./context/alerta/alertaState";
import AuthState from "./context/auth/authState";
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
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <RutaPrivada exact path="/registro" component={Registro} />
          </Switch>
        </Router>
      </AlertaState>
    </AuthState>
  );
}

export default App;
