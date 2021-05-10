import React, { useContext, useEffect } from "react";

import { Form, Input, Button, Select } from "antd";

import AsignaturaContext from "../../context/asignatura/asignaturaContext";
import CarreraContext from "../../context/carrera/carreraContext";
import UsuarioContext from "../../context/usuarios/usuarioContext";

import { capitalize } from "../../utils";

function AsignaturaEditarForm({ asignaturaEditar }) {
  const [form] = Form.useForm();
  const { Option } = Select;

  // Datos globales con useContext para usar los usuarios
  const usuarioContext = useContext(UsuarioContext);
  const { docentes, buscarDocentes } = usuarioContext;

  // Datos globales con useContext para usar los carreras
  const carreraContext = useContext(CarreraContext);
  const { carreras, buscarCarreras } = carreraContext;

  // Datos globales con useContext para usar las asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const { editarAsignatura } = asignaturaContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    buscarCarreras();
    buscarDocentes();

    form.setFieldsValue({
      asignatura: {
        codigo: asignaturaEditar?.codigo,
        nombre: asignaturaEditar?.nombre,
        carrera: asignaturaEditar?.carrera?._id,
        coordinador: asignaturaEditar?.coordinador?._id,
        docentes: asignaturaEditar?.docentes.map((docente) => docente?._id),
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asignaturaEditar]);

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { asignatura } = values;
    editarAsignatura(asignaturaEditar?._id, asignatura);
  };
  return (
    <Form
      name="asignaturaform"
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name={["asignatura", "codigo"]}
        label="Codigo"
        rules={[{ required: true, message: "El codigo es requerido" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["asignatura", "nombre"]}
        label="Nombre"
        rules={[{ required: true, message: "El nombre es requerido" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["asignatura", "carrera"]}
        label="Carrera"
        rules={[{ required: true, message: "La carrera es requerida" }]}
      >
        <Select
          showSearch
          placeholder="Seleccionar una carrera"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {carreras.map((carrera) => (
            <Option key={carrera._id} value={carrera._id}>
              {carrera.carrera}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name={["asignatura", "coordinador"]} label="Coordinador">
        <Select
          showSearch
          placeholder="Seleccionar un coordinador"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {docentes.map((docente) => (
            <Option key={docente._id} value={`${docente._id}`}>
              {`${capitalize(docente.nombre)} ${capitalize(docente.apellido)}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name={["asignatura", "docentes"]} label="Docentes">
        <Select
          mode="multiple"
          placeholder="Seleccionar docentes"
          style={{ width: "100%" }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {docentes.map((docente) => (
            <Select.Option key={docente._id} value={docente._id}>
              {`${capitalize(docente.nombre)} ${capitalize(docente.apellido)}`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item colon={false}>
        <Button block type="primary" htmlType="submit">
          Editar Asignatura
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AsignaturaEditarForm;