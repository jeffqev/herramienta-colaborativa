import React, { useContext, useEffect, useState } from "react";

import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Typography,
  Rate,
  Radio,
} from "antd";

import TemaContext from "../../context/tema/temaContext";
import ReferenciaContext from "../../context/referencia/referenciaContext";
import RichText from "./RichText";

import {
  capitalize,
  mostrarMsg,
  obtenerColor,
  textReferencia,
} from "../../utils";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

function EjercicioEditorForm({ idAsignatura, ejercicio, editarEjercicio }) {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const [ejercicioEditor, setEjercicioEditor] = useState(ejercicio.ejercicio);
  const [solucionEditor, setSolucionEditor] = useState(ejercicio.solucion);
  const [ejemploEditor, setEjemploEditor] = useState(ejercicio.ejemplo);
  const [color, setcolor] = useState(obtenerColor(ejercicio.dificultad));

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
    console.log(ejercicio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio, nuevocambior]);

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    values.ejercicio.asignatura = idAsignatura;

    if (ejercicioEditor.trim() === "") {
      mostrarMsg("El ejercicio no puede ser vacio", "error");
      return;
    }

    if (ejercicio.dificultad === 0) {
      mostrarMsg("Agregue una dificultad", "error");
      return;
    }

    values.ejercicio.ejercicio = ejercicioEditor;
    values.ejercicio.ejemplo = ejemploEditor;
    values.ejercicio.solucion = solucionEditor;

    console.log(values.ejercicio);
    console.log(ejercicio._id);
    editarEjercicio(ejercicio._id, values.ejercicio);
  };

  // Rate
  const customIcons = {
    1: <SmileOutlined />,
    2: <MehOutlined />,
    3: <FrownOutlined />,
  };

  const desc = ["Fácil", "Medio", "Difícil"];

  const handleColor = (value) => {
    setcolor(obtenerColor(value));
  };

  return (
    <div className="mt-3 ms-3">
      <h3 className=" mt-3  text-center"> Editar ejercicio</h3>

      <Form
        initialValues={{
          ejercicio: {
            titulo: ejercicio?.titulo,
            descripcion: ejercicio?.descripcion,
            dificultad: ejercicio?.dificultad,
            tema: ejercicio.tema?._id,
            evaluacion: ejercicio.evaluacion.toString(),
            referencia: ejercicio?.referencia.map(
              (referencia) => referencia?._id
            ),
          },
        }}
        form={form}
        name="ejerciciosform"
        onFinish={onFinish}
        layout="vertical"
        style={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
        <Row>
          <Col span={24} style={{ paddingRight: 40 }}>
            <Form.Item
              name={["ejercicio", "titulo"]}
              label={<Title level={4}>Titulo</Title>}
              rules={[
                {
                  required: true,
                  message: "El título de la ejercicio es requerido",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["ejercicio", "descripcion"]}
              label={<Title level={4}>Descripcion</Title>}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8} style={{ paddingRight: 10 }}>
            <Form.Item
              name={["ejercicio", "dificultad"]}
              label={<Title level={4}>Dificultad</Title>}
              rules={[
                {
                  required: true,
                  message: "la dificultad es requerida",
                },
              ]}
            >
              <Rate
                tooltips={desc}
                style={{ color: color, marginLeft: 30 }}
                count={3}
                character={({ index }) => customIcons[index + 1]}
                onChange={handleColor}
              />
            </Form.Item>
          </Col>
          <Col span={8} style={{ paddingRight: 10 }}>
            <Form.Item
              name={["ejercicio", "evaluacion"]}
              label={<Title level={4}>Tipo</Title>}
              rules={[
                {
                  required: true,
                  message: "El tipo es requerido",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="0">Practica</Radio.Button>
                <Radio.Button value="1">Evaluación</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8} style={{ paddingLeft: 10 }}>
            <Form.Item
              name={["ejercicio", "tema"]}
              label={<Title level={4}>Tema</Title>}
              rules={[
                {
                  required: true,
                  message: "Seleccione un formato",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Seleccionar Tema"
                style={{ width: "93%" }}
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

        <Title style={{ marginTop: 20, marginBottom: 10 }} level={4}>
          Solución
        </Title>
        <RichText
          htmleditor={solucionEditor}
          sethtmlEditor={setSolucionEditor}
        />

        <Title style={{ marginTop: 20, marginBottom: 10 }} level={4}>
          Ejemplo
        </Title>
        <RichText htmleditor={ejemploEditor} sethtmlEditor={setEjemploEditor} />

        <Form.Item
          style={{ marginTop: 30 }}
          name={["ejercicio", "referencia"]}
          label={<Title level={4}>Referencia</Title>}
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
            Editar Ejercicio
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EjercicioEditorForm;
