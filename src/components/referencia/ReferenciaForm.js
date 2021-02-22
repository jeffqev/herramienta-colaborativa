import React, { useContext, useEffect } from "react";

import { Form, Input, Button } from "antd";

import ReferenciaContext from "../../context/referencia/referenciaContext";

import { mostrarMsg } from "../../utils";
// import { InfoCircleOutlined } from "@ant-design/icons";

function ReferenciaForm({ idAsignatura }) {
  // Formularios de antd

  const [form] = Form.useForm();

  // Datos globales con useContext para usar las referencias
  const referenciaContext = useContext(ReferenciaContext);
  const { msg, nuevocambio, vaciarmsg, crearReferencia } = referenciaContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio]);

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { referencia } = values;
    referencia.asignatura = idAsignatura;
    crearReferencia(referencia);
    form.resetFields();
  };
  return (
    <div className="card  mt-3">
      <div className="card-header">
        <small>Agregar nueva referencia</small>
      </div>
      <div className="card-body">
        <Form
          form={form}
          name="referenciaform"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name={["referencia", "referencia"]}
            label="Referencia"
            rules={[{ required: true, message: "La referencia es requerida" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item colon={false}>
            <Button block type="primary" htmlType="submit">
              Agrear Referencia
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ReferenciaForm;
