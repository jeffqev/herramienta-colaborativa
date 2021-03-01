import React, { useContext, useEffect } from "react";
import AsignaturaContext from "../../context/asignatura/asignaturaContext";

import CardCoordinador from "./CardCoordinador";

function PracticasCoordinador() {
  const asignaturaContext = useContext(AsignaturaContext);
  const {
    nuevocambio,
    asignaturas,
    buscarAsignaturasCoordinador,
  } = asignaturaContext;

  useEffect(() => {
    buscarAsignaturasCoordinador();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);
  return (
    <div className="container mt-2">
      <div className="row d-flex justify-content-center">
        {asignaturas.map((asignatura) => (
          <CardCoordinador key={asignatura._id} asignatura={asignatura} />
        ))}
      </div>
    </div>
  );
}

export default PracticasCoordinador;
