import React from "react";
import { Column } from "@ant-design/charts";
import { Row } from "antd";

function Prubas() {
  var data = [
    {
      type: "Ejer 1",
      sales: 38,
    },
    {
      type: "Ejer 2",
      sales: 52,
    },
  ];

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

  return (
    <Row span="12">
      <Column {...config} />
    </Row>
  );
}

export default Prubas;
