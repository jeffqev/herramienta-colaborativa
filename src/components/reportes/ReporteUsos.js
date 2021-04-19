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

// import React, { useContext, useEffect } from "react";
// import { Bar } from "@ant-design/charts";

// import ReporteContext from "../../context/reportes/reporteContext";
// import { mostrarMsg } from "../../utils";

// function ReporteUsos({ idAsignatura }) {
//   const reporteContext = useContext(ReporteContext);
//   const {
//     reporteUsos: data,
//     msg,
//     vaciarmsg,
//     buscarReporteUsos,
//   } = reporteContext;

//   // Si hay cambios volver a hacer la consulta
//   useEffect(() => {
//     if (msg) {
//       mostrarMsg(msg.texto, msg.tipo);
//       vaciarmsg();
//     }

//     buscarReporteUsos(idAsignatura);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // var config = {
//   //   data: data,
//   //   xField: "type",
//   //   yField: "sales",
//   //   label: {
//   //     position: "middle",
//   //     style: {
//   //       fill: "#FFFFFF",
//   //       opacity: 0.6,
//   //     },
//   //   },
//   //   meta: {
//   //     type: { alias: "Titulo" },
//   //     sales: { alias: "Veces usado" },
//   //   },
//   // };

//   var config = {
//     data: data,
//     xField: "sales",
//     yField: "type",
//     seriesField: "type",
//     color: function color(_ref, i) {
//       console.log(_ref);
//       console.log(i);
//       return i % 2 === 0 ? "#FAAD14" : "#5B8FF9";
//     },
//     legend: false,
//     meta: {
//       type: { alias: "Titulo" },
//       sales: { alias: "Veces usado" },
//     },
//   };

//   return <Bar {...config} />;
// }

// export default ReporteUsos;
