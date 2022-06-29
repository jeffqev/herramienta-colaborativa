import React, { useContext, useEffect } from "react";

import { Form, Input, Button, Select, Row, Col, InputNumber } from "antd";
import Title from "antd/lib/typography/Title";

import PlantillaContext from "../../context/plantilla/plantillaContext";
import TemaContext from "../../context/tema/temaContext";

import { capitalize } from "../../utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function PlantillaEditarForm({ idAsignatura, plantilla }) {
  // Formularios de antd
  const { Option } = Select;
  const [form] = Form.useForm();

  // Datos globales con useContext para usar las practicass
  const plantillaContext = useContext(PlantillaContext);
  const { editarPlantilla } = plantillaContext;

  // Datos globales con useContext para usar las temas
  const temaContext = useContext(TemaContext);
  const { temas, nuevocambio, buscarTemas } = temaContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    buscarTemas(idAsignatura);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    values.plantilla.asignatura = idAsignatura;

    editarPlantilla(plantilla._id, values.plantilla);
    // form.resetFields();
  };

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 4 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 20 },
  //   },
  // };
  // const formItemLayoutWithOutLabel = {
  //   wrapperCol: {
  //     xs: { span: 24, offset: 0 },
  //     sm: { span: 20, offset: 4 },
  //   },
  // };

  return (
      <div className="mt-3 ms-3">
        <h3 className=" mt-3  text-center"> Editar plantilla</h3>

        <Form
            // {...formItemLayoutWithOutLabel}
            initialValues={{
              plantilla: {
                titulo: plantilla?.titulo,
                formato: plantilla?.formato,
                objetivos: plantilla?.objetivos,
                instrucciones: plantilla?.instrucciones,
                requisitos: plantilla?.requisitos,
                resultados: plantilla?.resultados,
                numero: plantilla?.numero,
                temas: plantilla.temas?._id,
              },
            }}
            form={form}
            name="practicasform"
            onFinish={onFinish}
            layout="vertical"
            style={{ paddingLeft: "5%", paddingRight: "5%" }}
        >
          <Form.Item
              name={["plantilla", "titulo"]}
              label={<Title level={4}>Título</Title>}
              rules={[
                {
                  required: true,
                  message: "El título de la practica es requerido",
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Row>
            <Col span={8} style={{ paddingRight: 10 }}>
              <Form.Item
                  name={["plantilla", "formato"]}
                  label={<Title level={4}>Formato</Title>}
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
            </Col>
            <Col span={8} style={{ paddingRight: 10 }}>
              <Form.Item
                  name={["plantilla", "numero"]}
                  label={<Title level={4}>Número Practica</Title>}
                  rules={[
                    {
                      required: true,
                      message: "El número de la practica es requerido",
                    },
                    {
                      type: "number",
                      min: 1,
                      message: "Ingrese un numero valido mayor a 0",
                    },
                  ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8} style={{ paddingLeft: 10 }}>
              <Form.Item
                  name={["plantilla", "temas"]}
                  label={<Title level={4}>Tema</Title>}
                  rules={[
                    {
                      required: true,
                      message: "Seleccione un formato",
                    },
                  ]}
              >
                <Select
                    placeholder="Seleccionar tema"
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

          <Title level={4}>Objetivos</Title>
          <Form.List
              name={["plantilla", "objetivos"]}
              rules={[
                {
                  required: true,
                  message: "Agregar almenos un objetivo",
                },
              ]}
          >
            {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                      <Form.Item
                          label={index === 0 ? "Objetivos" : ""}
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
                                message: "Agregar un objetivo o eliminar el campo",
                              },
                            ]}
                            noStyle
                        >
                          <Input
                              placeholder="Agregar nuevo objetivo"
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
                      Agregar Objetivos
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
            )}
          </Form.List>

          <Title level={4}>Pre-Requisitos</Title>
          <Form.List
              name={["plantilla", "requisitos"]}
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
                      Agregar Requisito
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
            )}
          </Form.List>

          <Title level={4}>Instrucciones</Title>
          <Form.List
              name={["plantilla", "instrucciones"]}
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
                      Agregar Instrucción
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
            )}
          </Form.List>

          <Title level={4}>Resultados obtenidos</Title>
          <Form.List
              name={["plantilla", "resultados"]}
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
                      Agregar Resultado
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
            )}
          </Form.List>

          <Form.Item>
            <Button className="text-center" type="primary" htmlType="submit">
              Editar Practicas
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
}

export default PlantillaEditarForm;