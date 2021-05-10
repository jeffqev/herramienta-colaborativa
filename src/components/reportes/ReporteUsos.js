import React, { useContext, useEffect } from "react";
import { Column } from "@ant-design/charts";

import ReporteContext from "../../context/reportes/reporteContext";
import { mostrarMsg } from "../../utils";

function ReporteUsos({ idAsignatura }) {
  const reporteContext = useContext(ReporteContext);
  const {
    reporteUsos: data,
    msg,
    vaciarmsg,
    buscarReporteUsos,
  } = reporteContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    buscarReporteUsos(idAsignatura);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var config = {
    data: data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    meta: {
      type: { alias: "Titulo" },
      sales: { alias: "Veces usado" },
    },
  };

  return <Column {...config} />;
}

export default ReporteUsos;
