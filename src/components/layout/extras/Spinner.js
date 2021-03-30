import { Spin } from "antd";
import React from "react";

function Spinner() {
  return (
    <Spin
      tip="Cargando..."
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 300,
      }}
      size="large"
    />
  );
}

export default Spinner;
