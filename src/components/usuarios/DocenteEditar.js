import React from "react";

import { Form, Input, Button } from "antd";

function DocenteEditar({ usuarioEditar, editarUsuario }) {
  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { usuario } = values;
    editarUsuario(usuarioEditar._id, usuario);
  };
  return (
    <Form
      initialValues={{
        usuario: {
          nombre: usuarioEditar.nombre,
          apellido: usuarioEditar.apellido,
          correo: usuarioEditar.correo,
        },
      }}
      name="usuarioform"
      onFinish={onFinish}
      layout="vertical"
    >
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

      <Form.Item colon={false}>
        <Button block type="primary" htmlType="submit">
          Editar Perfil
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DocenteEditar;
