import React, { useContext, useEffect } from "react";
import { Row, Col, Typography, Button, List, Collapse } from "antd";
import { useHistory } from "react-router-dom";

import PracticaContext from "../../context/practica/practicaContext";
import { EyeOutlined, RightOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";

import moment from "moment";
import "moment/locale/es";

function ListadoPracticas({ idAsignatura, tipo }) {
  const practicaContext = useContext(PracticaContext);
  const {
    nuevocambio,
    practicasAsignatura: data,
    buscarPracticasAsig,
  } = practicaContext;

  useEffect(() => {
    buscarPracticasAsig(idAsignatura);
    console.log(data.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  const history = useHistory();

  // const onFinish = (data) => {
  //   // if (data === undefined) {
  //   //   buscarPracticas();
  //   // } else {
  //   //   buscarPracticasAsig(data);
  //   // }
  //   console.log(data);
  // };

  return (
    <>
      <Row style={{ marginBottom: 20 }}>
        <Col md={5} style={{ marginTop: 20 }}>
          <Typography.Title level={5}>Filtros</Typography.Title>
          <div className="filtros">Asignaturas</div>

          {/* <Select
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
          </Select> */}
          {tipo === "coordinador" ? (
            <Button
              style={{ marginTop: 40 }}
              onClick={() => history.push(`/nueva/practica/` + idAsignatura)}
              block
              type="primary"
            >
              Nueva practica
            </Button>
          ) : null}
        </Col>
        <Col md={19}>
          {data.length > 0 ? (
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                pageSize: 5,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={
                      <RightOutlined
                        onClick={() => history.push(`/practicas/${item._id}`)}
                        style={{ paddingTop: 12 }}
                      />
                    }
                    title={
                      <Button
                        className="button-list"
                        type="link"
                        onClick={() => history.push(`/practicas/${item._id}`)}
                      >
                        {item.plantilla.titulo.toUpperCase()}
                      </Button>
                    }
                    description={
                      <>
                        <Row justify="space-between">
                          <>
                            {capitalize(item?.plantilla.coordinador.nombre)}{" "}
                            {capitalize(item?.plantilla.coordinador.apellido)}
                            {" | "}
                            {moment(item?.creado).format("LLL")}
                            {" | "}
                            {`Periodo ${item?.periodo.periodo}`}
                          </>
                          <EyeOutlined
                            style={{ marginLeft: 20 }}
                            onClick={() =>
                              history.push(`/practicas/${item._id}`)
                            }
                          />
                        </Row>
                      </>
                    }
                  />
                  <div style={{ paddingLeft: 30 }}>
                    {capitalize(item.plantilla.objetivos[0])}
                  </div>
                  <Collapse style={{ paddingLeft: 5 }} ghost>
                    <Collapse.Panel header="Ejercicios" key="1">
                      {item?.ejercicios.map((ejercicio) => (
                        <>
                          <p> {capitalize(ejercicio.titulo)} </p>{" "}
                        </>
                      ))}
                    </Collapse.Panel>
                  </Collapse>
                </List.Item>
              )}
            />
          ) : null}
        </Col>
      </Row>
    </>
  );
}

export default ListadoPracticas;
