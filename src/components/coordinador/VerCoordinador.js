import {Tabs} from "antd";
import React, {useContext, useEffect} from "react";

import AsignaturaContext from "../../context/asignatura/asignaturaContext";

import CardCoordinador from "./CardCoordinador";

function VerCoordinador() {
    const asignaturaContext = useContext(AsignaturaContext);
    const {
        nuevocambio,
        asignaturas,
        asignaturasDocente,
        buscarAsignaturasDocente,
        buscarAsignaturasCoordinador,
    } = asignaturaContext;

    useEffect(() => {
        buscarAsignaturasCoordinador();
        buscarAsignaturasDocente();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nuevocambio]);

    return (
        <div className="container ">
            {asignaturas.length > 0 ? (
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Asignaturas Coordinador" key="1">
                        <div className="row d-flex justify-content-center mt-2">
                            {/* <TituloStep texto={"Coordinador"} /> */}
                            {asignaturas.map((asignatura) => (
                                    <CardCoordinador
                                        key={asignatura._id}
                                        asignatura={asignatura}
                                        tipo={"coordinador"}
                                        colorcard={"#d46f4d"}
                                        periodo={asignatura.periodo.periodo}
                                    />
                            ))}
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            ) : null}

            {asignaturasDocente.length > 0 ? (
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Asignaturas Docente" key="1">
                        <div className="row d-flex justify-content-center">
                            {asignaturasDocente.map((asignatura) => (
                                <CardCoordinador
                                    key={asignatura._id}
                                    tipo={"docente"}
                                    asignatura={asignatura}
                                    colorcard={"#006692"}
                                    periodo={asignatura.periodo.periodo}
                                />
                            ))}
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            ) : null}
        </div>
    );
}

export default VerCoordinador;
