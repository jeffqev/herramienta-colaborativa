import React, { useContext, useEffect } from "react";

import AsignaturaContext from "../../context/asignatura/asignaturaContext";
import TituloStep from "../layout/extras/TituloStep";

import CardCoordinador from "./CardCoordinador";

function VerCoordinador() {
  const asignaturaContext = useContext(AsignaturaContext);
  const {
    nuevocambio,
    asignaturas,
    asignaturasDocente,
    buscarAsignaturasDocente,
    buscarAsignaturasCoordinador,
  } = asignaturaContext;

  useEffect(() => {
    buscarAsignaturasCoordinador();
    buscarAsignaturasDocente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);
  return (
    <div className="container mt-2">
      {asignaturas.length > 0 ? (
        <div className="row d-flex justify-content-center mt-2">
          <TituloStep texto={"Coordinador"} />
          {asignaturas.map((asignatura) => (
            <CardCoordinador
              key={asignatura._id}
              asignatura={asignatura}
              tipo={"coordinador"}
            />
          ))}
        </div>
      ) : null}

      {asignaturasDocente.length > 0 ? (
        <div className="row d-flex justify-content-center">
          <TituloStep texto={"Docente"} />
          {asignaturasDocente.map((asignatura) => (
            <CardCoordinador
              key={asignatura._id}
              tipo={"docente"}
              asignatura={asignatura}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default VerCoordinador;
