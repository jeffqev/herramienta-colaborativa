import React, { useContext, useEffect } from "react";

import { Form, InputNumber, Button, DatePicker } from "antd";
import PeriodoContext from "../../context/periodo/periodoContext";
import { mostrarMsg } from "../../utils";

// Configurar data picker en español
import moment from "moment";
import "moment/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";

function PeriodoForm() {
  // Variables globales de periodos
  const periodoContext = useContext(PeriodoContext);
  const { msg, crearPeriodo, vaciarmsg } = periodoContext;

  // Si existe un mensaje mostrarlo
  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

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
    const { periodo } = values;

    const periodoEnviar = {
      periodo: periodo.periodo,
      fechainicio: moment(periodo.fecha[0]).format("MM/DD/YYYY"),
      fechafin: moment(periodo.fecha[1]).format("MM/DD/YYYY"),
    };
    crearPeriodo(periodoEnviar);
  };

  return (
    <div className="card cardform mb-3">
      <div className="card-header">
        <small>Agregar nuevo periodo</small>
      </div>
      <div className="card-body">
        <Form
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
      </div>
    </div>
  );
}

export default PeriodoForm;
