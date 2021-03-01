import React from "react";
import AlertaState from "./alerta/alertaState";
import AsignaturaState from "./asignatura/asignaturaState";
import AuthState from "./auth/authState";
import CarreraState from "./carrera/carreraState";
import PeriodoState from "./periodo/periodoState";
import PracticaState from "./practica/practicaState";
import ReferenciaState from "./referencia/referenciaState";
import TemaState from "./tema/temaState";
import UsuarioState from "./usuarios/usuarioState";

function Context(props) {
  return (
    <AuthState>
      <AlertaState>
        <UsuarioState>
          <CarreraState>
            <PeriodoState>
              <TemaState>
                <ReferenciaState>
                  <PracticaState>
                    <AsignaturaState>{props.children}</AsignaturaState>
                  </PracticaState>
                </ReferenciaState>
              </TemaState>
            </PeriodoState>
          </CarreraState>
        </UsuarioState>
      </AlertaState>
    </AuthState>
  );
}

export default Context;
