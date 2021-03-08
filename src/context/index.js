import React from "react";

import AlertaState from "./alerta/alertaState";
import AsignaturaState from "./asignatura/asignaturaState";
import AuthState from "./auth/authState";
import CarreraState from "./carrera/carreraState";
import DashboardState from "./dashboard/dashboardState";
import PeriodoState from "./periodo/periodoState";
import PlantillaState from "./plantilla/plantillaState";
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
                    <DashboardState>
                      <PlantillaState>
                        <AsignaturaState>{props.children}</AsignaturaState>
                      </PlantillaState>
                    </DashboardState>
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
