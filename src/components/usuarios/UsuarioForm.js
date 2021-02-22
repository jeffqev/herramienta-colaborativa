import React from "react";
import DocenteForm from "./DocenteForm";

function UsuarioForm() {
  return (
    <>
      <div className="card mt-2">
        <div className="card-header text-center">
          <small>Agregar nuevo usuario</small>
        </div>
        <div className="card-body">
          <DocenteForm tipo={"administrador"} />
        </div>
      </div>
    </>
  );
}

export default UsuarioForm;
