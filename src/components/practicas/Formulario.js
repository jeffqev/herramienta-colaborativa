import React, { useContext, useEffect } from "react";

import { Form, Input, Button, Select, Row, Col } from "antd";

import PracticaContext from "../../context/practica/practicaContext";
import TemaContext from "../../context/tema/temaContext";

import { mostrarMsg, capitalize } from "../../utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function Formulario({ idAsignatura }) {
  // Formularios de antd
  const { Option } = Select;
  const [form] = Form.useForm();

  // Datos globales con useContext para usar las practicass
  const practicaContext = useContext(PracticaContext);
  const { msg, vaciarmsg, crearPractica } = practicaContext;

  // Datos globales con useContext para usar las temas
  const temaContext = useContext(TemaContext);
  const { temas, buscarTemas } = temaContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }

    buscarTemas(idAsignatura);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { practicas } = values;

    practicas.asignatura = idAsignatura;

    console.log(practicas);
    crearPractica(practicas);
    // form.resetFields();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  return (
    <div className="mt-3 ms-3">
      <h3 className=" mt-3 mb-5 text-center"> Nueva practica</h3>

      <Form
        // {...formItemLayoutWithOutLabel}
        form={form}
        name="practicasform"
        onFinish={onFinish}
      >
        <Row>
          <Col span={12} style={{ paddingRight: 10 }}>
            <Form.Item
              name={["practicas", "titulo"]}
              label="Título"
              rules={[
                {
                  required: true,
                  message: "El título de la practica es requerido",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["practicas", "objetivo"]}
              label="Objetivo"
              rules={[
                {
                  required: true,
                  message: "El objetivo de la practica es requerido",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingLeft: 10 }}>
            <Form.Item
              name={["practicas", "formato"]}
              label="Formato"
              rules={[
                {
                  required: true,
                  message: "Seleccione un formato",
                },
              ]}
            >
              <Select placeholder="Seleccionar un formato">
                <Option value="practica de laboratorio">
                  Practica de Laboratorio
                </Option>
                <Option value="talleres">Talleres</Option>
                <Option value="centros de simulacion">
                  Centros de Simulacion
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={["practicas", "temas"]}
              label="Tema"
              rules={[
                {
                  required: true,
                  message: "Seleccione un formato",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Seleccionar docentes"
                style={{ width: "100%" }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {temas.map((tema) => (
                  <Select.Option key={tema._id} value={tema._id}>
                    {`${capitalize(tema.nombre)}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <h5> Pre-Requisitos</h5>
        <Form.List
          name={["practicas", "requisitos"]}
          rules={[
            {
              required: true,
              message: "Agregar almenos un requisito",
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Requisitos" : ""}
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
                        message: "Agregar un requisito o eliminar el campo",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Agregar nuevo requisito"
                      style={{ width: "60%" }}
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
                  style={{ width: "67%" }}
                  icon={<PlusOutlined />}
                >
                  Agregar Requisito
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <h5> Instrucciones</h5>
        <Form.List
          name={["practicas", "instrucciones"]}
          rules={[
            {
              required: true,
              message: "Agregar almenos una instrucción",
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Instrucciones" : ""}
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
                        message: "Agregar una instrucción o eliminar el campo",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Agregar nueva instrucción"
                      style={{ width: "60%" }}
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
                  style={{ width: "67%" }}
                  icon={<PlusOutlined />}
                >
                  Agregar Instrucción
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <h5> Resultados obtenidos </h5>
        <Form.List
          name={["practicas", "resultados"]}
          rules={[
            {
              required: true,
              message: "Agregar almenos un resultado",
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Resultado" : ""}
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
                        message: "Agregar un resultado o eliminar el campo",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Agregar nuevo resultado"
                      style={{ width: "60%" }}
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
                  style={{ width: "67%" }}
                  icon={<PlusOutlined />}
                >
                  Agregar Resultado
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <h5> Conclusiones </h5>
        <Form.List
          name={["practicas", "concluciones"]}
          rules={[
            {
              required: true,
              message: "Agregar almenos una conclucion",
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Concluciones" : ""}
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
                        message: "Agregar una conclución o eliminar el campo",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Agregar nueva conclución"
                      style={{ width: "60%" }}
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
                  style={{ width: "67%" }}
                  icon={<PlusOutlined />}
                >
                  Agregar conclución
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button className="text-center" type="primary" htmlType="submit">
            Agrear Practicas
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Formulario;
