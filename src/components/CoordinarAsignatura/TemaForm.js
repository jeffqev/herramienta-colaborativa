import React, { useContext, useEffect } from "react";

import { Form, Input, Button, Select } from "antd";

import TemaContext from "../../context/tema/temaContext";

import { mostrarMsg, capitalize } from "../../utils";
import { InfoCircleOutlined } from "@ant-design/icons";

function TemaForm({ idAsignatura }) {
  // Formularios de antd
  const { Option } = Select;
  const [form] = Form.useForm();

  // Datos globales con useContext para usar las temas
  const temaContext = useContext(TemaContext);
  const {
    padres,
    msg,
    nuevocambio,
    vaciarmsg,
    crearTema,
    buscarTemasPadre,
  } = temaContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    buscarTemasPadre(idAsignatura);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio]);

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { tema } = values;

    // revisar si se ha seleccionado un tema padre
    if (tema["padre"] === undefined || tema["padre"] === null) {
      delete tema["padre"];
    }

    tema.asignatura = idAsignatura;
    crearTema(tema);
    form.resetFields();
  };
  return (
    <div className="card  mt-3">
      <div className="card-header">
        <small>Agregar nueva tema</small>
      </div>
      <div className="card-body">
        <Form form={form} name="temaform" onFinish={onFinish} layout="vertical">
          <Form.Item
            name={["tema", "nombre"]}
            label="Nombre"
            rules={[{ required: true, message: "El nombre es requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["tema", "padre"]}
            label="Tema padre"
            tooltip={{
              title: "Si se envia vacio sera un tema padre",
              icon: (
                <InfoCircleOutlined
                  style={{ paddingTop: 5, paddingRight: 5 }}
                />
              ),
            }}
          >
            <Select
              showSearch
              allowClear
              placeholder="Seleccionar un tema padre"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {padres.map((tema) => (
                <Option key={tema._id} value={tema._id}>
                  {capitalize(tema.nombre)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item colon={false}>
            <Button block type="primary" htmlType="submit">
              Agrear Tema
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default TemaForm;
