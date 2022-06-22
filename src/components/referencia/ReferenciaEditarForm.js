import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import ReferenciaContext from "../../context/referencia/referenciaContext";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function ReferenciaEditarForm({ idAsignatura, referenciaEditar }) {
  // Formularios de antd

  const [form] = Form.useForm();
  const [tipoForm, setTipoForm] = useState(referenciaEditar?.tipo);
  // Datos globales con useContext para usar las referencias
  const referenciaContext = useContext(ReferenciaContext);
  const { editarReferencia } = referenciaContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    form.setFieldsValue({
      referencia: {
        titulo: referenciaEditar?.titulo,
        colaboradores: referenciaEditar?.colaboradores,
        anio: referenciaEditar?.anio,
        edicion: referenciaEditar?.edicion,
        editorial: referenciaEditar?.editorial,
        url: referenciaEditar?.url,
        // padre: referenciaEditar?.padre?._id,
      },
    });
    setTipoForm(referenciaEditar?.tipo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenciaEditar]);

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const { referencia } = values;
    referencia.asignatura = idAsignatura;
    referencia.tipo = tipoForm;
    editarReferencia(referenciaEditar?._id, referencia);
  };

  return (
    <>
      <Form
        form={form}
        name="referenciaform"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name={["referencia", "titulo"]}
          label="Titulo"
          rules={[{ required: true, message: "El titulo es requerido" }]}
        >
          <Input />
        </Form.Item>

        <Form.List
          name={["referencia", "colaboradores"]}
          rules={[
            {
              required: true,
              message: "Agregar almenos un autor",
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Autores" : ""}
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
                        message: "Agregar un autor o eliminar el campo",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Agregar nuevo autor"
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
                  Agregar Autor
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name={["referencia", "anio"]}
          label="Año de publicacion"
          rules={[
            {
              type: "number",
              min: 1,
              message: "Ingrese un numero valido mayor a 0",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        {tipoForm === "libro" ? (
          <>
            <Form.Item name={["referencia", "edicion"]} label="Edición">
              <Input />
            </Form.Item>

            <Form.Item name={["referencia", "editorial"]} label="Editorial">
              <Input />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            name={["referencia", "url"]}
            label="URL"
            rules={[{ required: true, message: "La url es requerida" }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item colon={false}>
          <Button block type="primary" htmlType="submit">
            Editar Referencia
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ReferenciaEditarForm;
