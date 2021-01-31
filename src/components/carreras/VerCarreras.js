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
  } = carreraContext;

  useEffect(() => {
    buscarCarreras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  return (
    <div className="container mt-2">
      <div className="row">
        {carreras.map((carrera) => (
          <CardCarrera
            key={carrera._id}
            carrera={carrera}
            eliminarCarrera={eliminarCarrera}
          />
        ))}
      </div>
    </div>
  );
}

export default VerCarreras;
