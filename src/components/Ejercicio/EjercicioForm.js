import React, { useContext, useEffect, useState } from "react";

import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Typography,
  InputNumber,
} from "antd";

import EjercicioContext from "../../context/ejercicio/ejercicioContext";
import TemaContext from "../../context/tema/temaContext";
import ReferenciaContext from "../../context/referencia/referenciaContext";
import RichText from "./RichText";

import { capitalize, mostrarMsg, textReferencia } from "../../utils";

function EjercicioForm({ idAsignatura }) {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const [ejercicioEditor, setEjercicioEditor] = useState("");
  const [solucionEditor, setSolucionEditor] = useState("");
  const [ejemploEditor, setEjemploEditor] = useState("");

  // Datos globales con useContext para usar las ejercicioss
  const ejercicioContext = useContext(EjercicioContext);
  const { crearEjercicio } = ejercicioContext;

  // Datos globales con useContext para usar los temas
  const temaContext = useContext(TemaContext);
  const { temas, nuevocambio, buscarTemas } = temaContext;

  // Datos globales con useContext para usar las referencias
  const referenciaContext = useContext(ReferenciaContext);
  const {
    refasignatura,
    nuevocambio: nuevocambior,
    buscarReferenciasAsignatura,
  } = referenciaContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    buscarTemas(idAsignatura);
    buscarReferenciasAsignatura(idAsignatura);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio, nuevocambior]);

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { ejercicio } = values;

    ejercicio.asignatura = idAsignatura;

    if (ejercicioEditor.trim() === "") {
      mostrarMsg("El ejercicio no puede ser vacio", "error");
    }

    ejercicio.ejercicio = ejercicioEditor;
    ejercicio.ejemplo = ejemploEditor;
    ejercicio.solucion = solucionEditor;

    crearEjercicio(ejercicio);
    form.resetFields();
    setEjercicioEditor("");
    setEjemploEditor("");
    setSolucionEditor("");
  };

  return (
    <div className="mt-3 ms-3">
      <h3 className=" mt-3  text-center"> Nueva ejercicio</h3>

      <Form
        form={form}
        name="ejerciciosform"
        onFinish={onFinish}
        // layout="vertical"
        style={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
        <Row>
          <Col span={24} style={{ paddingRight: 20 }}>
            <Form.Item
              name={["ejercicio", "titulo"]}
              label="Título"
              rules={[
                {
                  required: true,
                  message: "El título de la ejercicio es requerido",
                },
              ]}
            >
              <Input className="ms-3" />
            </Form.Item>

            <Form.Item
              name={["ejercicio", "descripcion"]}
              label="Descripcion"
              rules={[
                {
                  required: true,
                  message: "la descripcion del ejercicio es requerido",
                },
              ]}
            >
              <Input className="ms-3" />
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingRight: 10 }}>
            <Form.Item
              name={["ejercicio", "dificultad"]}
              label="Dificultad"
              rules={[
                {
                  required: true,
                  message: "la dificultad es requerida",
                },
                {
                  type: "number",
                  min: 1,
                  max: 5,
                  message: "Dificulta debe ser de 1 a 5",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingLeft: 10 }}>
            <Form.Item
              name={["ejercicio", "tema"]}
              label="Tema"
              rules={[
                {
                  required: true,
                  message: "Seleccione un formato",
                },
              ]}
            >
              <Select
                placeholder="Seleccionar Tema"
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
        <Title level={4}>Ejercicio</Title>
        <RichText
          htmleditor={ejercicioEditor}
          sethtmlEditor={setEjercicioEditor}
        />

        <Row style={{ marginTop: 20, marginBottom: 10 }}>
          <Col md={12} style={{ padding: 3 }}>
            <Title level={4}>Solución</Title>
            <RichText
              htmleditor={solucionEditor}
              sethtmlEditor={setSolucionEditor}
            />
          </Col>
          <Col md={12} style={{ padding: 3 }}>
            <Title level={4}>Ejemplo</Title>
            <RichText
              htmleditor={ejemploEditor}
              sethtmlEditor={setEjemploEditor}
            />
          </Col>
        </Row>

        <Form.Item
          style={{ marginTop: 30 }}
          name={["ejercicio", "referencia"]}
          label="Referencia"
        >
          <Select
            mode="multiple"
            placeholder="Seleccionar referencia"
            style={{ width: "100%" }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {refasignatura.map((referencia) => (
              <Select.Option key={referencia._id} value={referencia._id}>
                {`${textReferencia(referencia)}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className="text-center" type="primary" htmlType="submit">
            Agrear Ejercicios
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EjercicioForm;
