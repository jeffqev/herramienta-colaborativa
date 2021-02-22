import React, { useContext, useEffect } from "react";

import { Form, Input, Button } from "antd";

import UsuarioContext from "../../context/usuarios/usuarioContext";

import { mostrarMsg } from "../../utils";

function DocenteForm() {
  // Formularios de antd

  const [form] = Form.useForm();

  // Datos globales con useContext para usar las usuarios
  const usuarioContext = useContext(UsuarioContext);
  const { msg, nuevocambio, vaciarmsg, crearUsuario } = usuarioContext;

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
    const { usuario } = values;
    crearUsuario(usuario);
    form.resetFields();
  };
  return (
    <Form form={form} name="usuarioform" onFinish={onFinish} layout="vertical">
      <Form.Item
        name={["usuario", "nombre"]}
        label="Nombre"
        rules={[{ required: true, message: "El nombre es requerido" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["usuario", "apellido"]}
        label="Apellido"
        rules={[{ required: true, message: "El apellido es requerido" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["usuario", "correo"]}
        label="Correo Electronico"
        rules={[
          { required: true, message: "El correo es requerido" },
          { type: "email", message: "Correo no valido" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["usuario", "contrasena"]}
        label="Contraseña"
        rules={[{ required: true, message: "La contraseña es requerido" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item colon={false}>
        <Button block type="primary" htmlType="submit">
          Agrear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DocenteForm;
