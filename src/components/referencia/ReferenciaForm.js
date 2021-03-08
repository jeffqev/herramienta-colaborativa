import React, { useContext, useEffect, useState } from "react";

import { Form, Input, Button, InputNumber, Radio } from "antd";

import ReferenciaContext from "../../context/referencia/referenciaContext";

import { mostrarMsg } from "../../utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

// import { InfoCircleOutlined } from "@ant-design/icons";

function ReferenciaForm({ idAsignatura }) {
  // Formularios de antd

  const [form] = Form.useForm();
  const [tipoForm, setTipoForm] = useState("libro");
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
    referencia.tipo = tipoForm;
    crearReferencia(referencia);
    form.resetFields();
  };

  const handleTipo = (e) => {
    setTipoForm(e.target.value);
  };

  return (
    <>
      <div>
        Tipo:{" "}
        <Radio.Group onChange={handleTipo} defaultValue="libro" size="small">
          <Radio.Button value="libro">Libro</Radio.Button>
          <Radio.Button value="web">Sitio Web</Radio.Button>
        </Radio.Group>
      </div>

      <br />
      <Form
        form={form}
        name="referenciaform"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name={["referencia", "titulo"]}
          label="Titulo"
          rules={[{ required: true, message: "El titulo es requerido" }]}
        >
          <Input />
        </Form.Item>

        <Form.List
          name={["referencia", "colaboradores"]}
          rules={[
            {
              required: true,
              message: "Agregar almenos un colaborador",
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  // {...(index === 0
                  //   ? formItemLayout
                  //   : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Colaboradores" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Agregar un colaborador o eliminar el campo",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Agregar nuevo colaborador"
                      style={{ width: "86%" }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "100%" }}
                  icon={<PlusOutlined />}
                >
                  Agregar Colaborador
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name={["referencia", "anio"]}
          label="Año de publicacion"
          rules={[
            {
              type: "number",
              min: 1,
              message: "Ingrese un numero valido mayor a 0",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        {tipoForm === "libro" ? (
          <>
            <Form.Item name={["referencia", "edicion"]} label="Edicion">
              <Input />
            </Form.Item>

            <Form.Item name={["referencia", "editorial"]} label="Editorial">
              <Input />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            name={["referencia", "url"]}
            label="URL"
            rules={[{ required: true, message: "La url es requerida" }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item colon={false}>
          <Button block type="primary" htmlType="submit">
            Agrear Referencia
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ReferenciaForm;
