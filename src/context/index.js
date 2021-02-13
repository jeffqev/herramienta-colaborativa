import React from "react";
import AlertaState from "./alerta/alertaState";
import AsignaturaState from "./asignatura/asignaturaState";
import AuthState from "./auth/authState";
import CarreraState from "./carrera/carreraState";
import PeriodoState from "./periodo/periodoState";
import UsuarioState from "./usuarios/usuarioState";

function Context(props) {
  return (
    <AuthState>
      <AlertaState>
        <UsuarioState>
          <CarreraState>
            <PeriodoState>
              <AsignaturaState>{props.children}</AsignaturaState>
            </PeriodoState>
          </CarreraState>
        </UsuarioState>
      </AlertaState>
    </AuthState>
  );
}

export default Context;
