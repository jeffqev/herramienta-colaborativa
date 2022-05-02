import React, { useContext } from "react";
import { Form, Button, Rate } from "antd";
import CalificacionContext from "../../context/calificacion/calificacionContext";

function Calificar({ idEjercicio }) {
  // Formularios de antd
  const [form] = Form.useForm();

  // Datos globales con useContext para usar las calificacions
  const calificacionContext = useContext(CalificacionContext);
  const { crearCalificacion } = calificacionContext;

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { calificacion } = values;
    calificacion.ejercicio = idEjercicio;
    crearCalificacion(calificacion);
  };

  return (
    <>
      <Form
        form={form}
        name="calificacionform"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name={["calificacion", "puntaje"]}
          label="Calificación"
          rules={[{ required: true, message: "El puntaje es requerido" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item colon={false}>
          <Button type="primary" htmlType="submit">
            Agrear Calificacion
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Calificar;
