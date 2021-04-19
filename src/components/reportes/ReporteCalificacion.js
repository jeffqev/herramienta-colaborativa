import React, { useContext, useEffect } from "react";

import ReporteContext from "../../context/reportes/reporteContext";
import { capitalize, mostrarMsg, SumPuntaje } from "../../utils";
import { Rate } from "antd";
import { Link } from "react-router-dom";

function ReporteCalificacion({ idAsignatura }) {
  const reporteContext = useContext(ReporteContext);
  const {
    reporteCalificacion: data,
    msg,
    vaciarmsg,
    buscarReporteCalificacion,
  } = reporteContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    buscarReporteCalificacion(idAsignatura);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table style={{ width: "100%" }}>
      <tr>
        <th></th>
        <th></th>
      </tr>
      {data.map((ejercicio) => (
        <>
          <tr>
            <td width="60%">
              <Link to={`/ejercicios/${idAsignatura}/${ejercicio._id}`}>
                {capitalize(ejercicio.titulo)}
              </Link>
            </td>
            <td>
              <Rate
                allowHalf
                disabled
                defaultValue={
                  SumPuntaje(ejercicio.calificacion) /
                  ejercicio.calificacion.length
                }
              />
            </td>
          </tr>
        </>
      ))}
    </table>
  );
}

export default ReporteCalificacion;
