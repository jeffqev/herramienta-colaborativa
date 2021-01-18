import React from "react";

function Alerta({ alerta }) {
  return (
    <div
      className={`alert alert-${alerta.categoria} alert-dismissible fade show mt-2`}
      role="alert"
    >
      {alerta.msg}
    </div>
  );
}

export default Alerta;
