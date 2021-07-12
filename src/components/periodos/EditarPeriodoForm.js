import React, { useContext, useEffect } from "react";

import { Form, InputNumber, Button, DatePicker } from "antd";
import PeriodoContext from "../../context/periodo/periodoContext";

// Configurar data picker en español
import moment from "moment";
import "moment/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";

function EditarPeriodoForm({ periodo }) {
  const [form] = Form.useForm();

  // Variables globales de periodos
  const periodoContext = useContext(PeriodoContext);
  const { editarPeriodo } = periodoContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    form.setFieldsValue({
      periodo: {
        periodo: periodo?.periodo,
        fecha: [moment(periodo?.fechainicio), moment(periodo?.fechafin)],
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodo]);

  // Configurar Input de fecha
  const { RangePicker } = DatePicker;
  const validateMessages = {
    required: "Es requerido",
    types: {
      number: "No es un numero valido",
    },
    number: {
      range: "Los periodos deben ser mayor a 0",
    },
  };

  // Validar datos y guardar en la db
  const onFinish = (values) => {
    const periodoEnviar = {
      periodo: values.periodo.periodo,
      fechainicio: moment(values.periodo.fecha[0]).format("MM/DD/YYYY"),
      fechafin: moment(values.periodo.fecha[1]).format("MM/DD/YYYY"),
    };
    editarPeriodo(periodo._id, periodoEnviar);
  };

  return (
    <Form
      form={form}
      name="Periodo"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["periodo", "periodo"]}
        label="Periodo"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
            max: 1000,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name={["periodo", "fecha"]}
        label="Fecha"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <RangePicker
          locale={locale}
          placeholder={["Inicio periodo", "Fin periodo"]}
        />
      </Form.Item>

      <Button block htmlType="submit">
        Guardar Periodo
      </Button>
    </Form>
  );
}

export default EditarPeriodoForm;
