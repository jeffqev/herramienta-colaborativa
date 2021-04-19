import React, { useContext, useEffect } from "react";
import { Row, Col, Typography, Button, Select } from "antd";
import Listado from "./Listado";
import { useHistory } from "react-router-dom";

import PracticaContext from "../../context/practica/practicaContext";
import AsignaturaContext from "../../context/asignatura/asignaturaContext";

function ListadoPracticas() {
  // Datos globales con useContext para usar los carreras
  const asignaturaContext = useContext(AsignaturaContext);
  const { asignaturas, buscarAsignaturasCoordinador } = asignaturaContext;

  const practicaContext = useContext(PracticaContext);
  const {
    nuevocambio,
    practicas,
    buscarPracticas,
    buscarPracticasAsig,
  } = practicaContext;

  useEffect(() => {
    buscarPracticas();
    buscarAsignaturasCoordinador();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  const history = useHistory();

  const onFinish = (data) => {
    if (data === undefined) {
      buscarPracticas();
    } else {
      buscarPracticasAsig(data);
    }
  };

  return (
    <>
      <Row>
        <Col md={5} style={{ marginTop: 20 }}>
          <Typography.Title level={5}>Filtros</Typography.Title>
          <div className="filtros">Asignaturas</div>

          <Select
            style={{ width: "100%" }}
            onChange={onFinish}
            allowClear
            showSearch
            placeholder="Filtrar por asignatura"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {asignaturas.map((asignatura) => (
              <Select.Option key={asignatura._id} value={asignatura._id}>
                {asignatura.nombre}
              </Select.Option>
            ))}
          </Select>

          <Button
            style={{ marginTop: 40 }}
            onClick={() => history.push(`/gestionar/practicas`)}
            block
            type="dashed"
          >
            Nueva practica
          </Button>
        </Col>
        <Col md={19}>
          <Listado data={practicas} />
        </Col>
      </Row>
    </>
  );
}

export default ListadoPracticas;
