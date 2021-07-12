import React from "react";

import { Form, Input, Button } from "antd";
import { mostrarMsg } from "../../utils";

function DocenteEditarPassword({ usuarioEditar, editarUsuario }) {
  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { usuario } = values;

    if (usuario.contrasena !== usuario.contrasena2) {
      mostrarMsg("Las contraseñas no son iguales", "error");
      return;
    }
    delete usuario["contrasena2"];
    editarUsuario(usuarioEditar._id, usuario);
  };
  return (
    <Form name="usuarioformContra" onFinish={onFinish} layout="vertical">
      <Form.Item
        name={["usuario", "contrasena"]}
        label="Nueva Contraseña"
        rules={[
          { required: true, message: "La contraseña es requerido" },
          { min: 6, message: "La contraseña debe tener minimo 6 caracteres" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name={["usuario", "contrasena2"]}
        label="Confirmar Contraseña"
        rules={[
          {
            required: true,
            message: "La confirmacion de la contraseña es requerida",
          },
          { min: 6, message: "La contraseña debe tener minimo 6 caracteres" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item colon={false}>
        <Button block type="primary" htmlType="submit">
          Editar Contraseña
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DocenteEditarPassword;
