import { Typography } from "antd";
import React, { useContext, useEffect } from "react";
import CalificacionContext from "../../context/calificacion/calificacionContext";
import { mostrarMsg } from "../../utils";
import Calificar from "./Calificar";
import EditarCalificacion from "./EditarCalificacion";

function MiCalificacion({ idEjercicio }) {
  // Datos globales con useContext para usar las calificacions
  const calificacionContext = useContext(CalificacionContext);
  const {
    calificacion,
    msg,
    nuevocambio,
    vaciarmsg,
    buscarCalificaciones,
  } = calificacionContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    buscarCalificaciones(idEjercicio);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio]);

  return (
    <>
      {calificacion.length !== 0 ? (
        <>
          {/* <Space direction="vertical"> */}
          <EditarCalificacion idEjercicio={idEjercicio} />
          <Typography.Text style={{ marginLeft: 5 }} type="secondary">
            Modificar Calificación
          </Typography.Text>
          {/* </Space> */}
        </>
      ) : (
        <Calificar idEjercicio={idEjercicio} />
      )}
    </>
  );
}

export default MiCalificacion;
