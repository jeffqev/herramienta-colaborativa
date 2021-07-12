import React, { useContext, useEffect } from "react";
import { Pie } from "@ant-design/charts";

import ReporteContext from "../../context/reportes/reporteContext";
import { mostrarMsg } from "../../utils";

function ReporteTemas({ idAsignatura }) {
  const reporteContext = useContext(ReporteContext);
  const {
    reporteTemas: data,
    msg,
    vaciarmsg,
    buscarReporteTema,
  } = reporteContext;

  // Si hay cambios volver a hacer la consulta
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    buscarReporteTema(idAsignatura);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: { type: "outer" },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  return <Pie {...config} />;
}

export default ReporteTemas;
