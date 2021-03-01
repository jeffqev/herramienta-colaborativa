import React from "react";
import { useHistory } from "react-router-dom";

import { Card } from "antd";
import {
  AuditOutlined,
  // EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import { capitalize } from "../../utils";
const { Meta } = Card;

function CardCoordinador({ asignatura }) {
  const history = useHistory();

  return (
    <>
      <Card
        hoverable
        style={{ width: 350, marginRight: 10, marginBottom: 10 }}
        actions={[
          // <EyeOutlined
          //   key="ver"
          //   onClick={() => history.push(`/practica/${asignatura._id}`)}
          // />,
          <PlusCircleOutlined
            key="enviar"
            onClick={() =>
              history.push(`/gestionar/practicas/${asignatura._id}`)
            }
          />,
        ]}
      >
        <Meta
          avatar={<AuditOutlined />}
          title={capitalize(asignatura.nombre)}
          description={capitalize(asignatura.carrera.carrera)}
        />
      </Card>
    </>
  );
}

export default CardCoordinador;
