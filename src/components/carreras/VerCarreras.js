import React, { useContext, useEffect } from "react";
import CarreraContext from "../../context/carrera/carreraContext";

import CardCarrera from "./CardCarrera";

function VerCarreras() {
  const carreraContext = useContext(CarreraContext);
  const {
    nuevocambio,
    carreras,
    buscarCarreras,
    eliminarCarrera,
    enviaraAsignatura,
  } = carreraContext;

  useEffect(() => {
    buscarCarreras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  return (
    <>
      {carreras.map((carrera) => (
        <CardCarrera
          key={carrera._id}
          carrera={carrera}
          eliminarCarrera={eliminarCarrera}
          enviaraAsignatura={enviaraAsignatura}
        />
      ))}
    </>
  );
}

export default VerCarreras;
