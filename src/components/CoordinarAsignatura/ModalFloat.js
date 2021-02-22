import React from "react";
import DocenteForm from "../usuarios/DocenteForm";
import { Tabs } from "antd";
import AgregarDocente from "./AgregarDocente";

function ModalFloat({ asignatura }) {
  const { TabPane } = Tabs;

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Docentes" key="1">
          <AgregarDocente asignaturaActual={asignatura} />
        </TabPane>

        <TabPane tab="Agregar Docentes" key="3">
          <DocenteForm tipo={"docente"} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ModalFloat;
