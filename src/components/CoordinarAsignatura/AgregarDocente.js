import React, { useContext, useEffect } from "react";
import { Form, Button, Select } from "antd";
import { mostrarMsg, capitalize } from "../../utils";

import AsignaturaContext from "../../context/asignatura/asignaturaContext";
import UsuarioContext from "../../context/usuarios/usuarioContext";

function AgregarDocente({ asignaturaActual }) {
  // Datos globales con useContext para usar los usuarios
  const usuarioContext = useContext(UsuarioContext);
  const { docentes, nuevocambio, buscarDocentes } = usuarioContext;

  // Datos globales con useContext para usar las asignaturas
  const asignaturaContext = useContext(AsignaturaContext);
  const { msg, docentesAsignatura, vaciarmsg } = asignaturaContext;

  const onFinish = (values) => {
    const { asignatura } = values;

    docentesAsignatura(asignaturaActual._id, asignatura);

  };

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }
    buscarDocentes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio]);

  return (
    <>
      <Form
        initialValues={{
          asignatura: {
            docentes: asignaturaActual.docentes.map((docente) => docente._id),
          },
        }}
        name="asignaturaform"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name={["asignatura", "docentes"]}
          label="Docentes incluidos en la asignatura"
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
            {docentes.map((docente) => (
              <Select.Option key={docente?._id} value={docente?._id}>
                {`${capitalize(docente?.nombre)} ${capitalize(
                  docente?.apellido
                )}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item colon={false}>
          <Button block type="primary" htmlType="submit">
            Agrear docentes
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AgregarDocente;
