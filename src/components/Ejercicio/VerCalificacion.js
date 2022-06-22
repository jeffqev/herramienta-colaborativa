import React, { useContext, useEffect } from "react";
import { Alert, Rate, Typography } from "antd";
import CalificacionContext from "../../context/calificacion/calificacionContext";
import { SumPuntaje } from "../../utils";

function VerCalificacion({ idEjercicio }) {
  // Datos globales con useContext para usar las calificacions
  const calificacionContext = useContext(CalificacionContext);
  const {
    msg,
    calificacionesEjercicio,
    buscarCalificacionEjercicio,
    nuevocambio,
  } = calificacionContext;

  useEffect(() => {
    buscarCalificacionEjercicio(idEjercicio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio]);

  // Validar datos y guardar en la db
  // const onFinish = (values) => {
  //   const { calificacion } = values;
  //   calificacion.ejercicio = idEjercicio;
  //   crearCalificacion(calificacion);
  //   // form.resetFields();
  // };

  const handleChange = () => {
    console.log('handleChange');
  };

  return (
    <>
      {calificacionesEjercicio.length !== 0 ? (
        <>
          <Rate
            onChange={handleChange}
            allowHalf
            disabled
            defaultValue={
              SumPuntaje(calificacionesEjercicio) /
              calificacionesEjercicio.length
            }
          />
          {calificacionesEjercicio.length === 1 ? (
            <Typography.Text style={{ marginLeft: 5 }} type="secondary">
              {calificacionesEjercicio.length} Calificación
            </Typography.Text>
          ) : (
            <Typography.Text style={{ marginLeft: 5 }} type="secondary">
              {calificacionesEjercicio.length} Calificaciones
            </Typography.Text>
          )}
        </>
      ) : (
        <Alert
          message="El ejercicio no cuenta con calificaciones"
          type="success"
          showIcon
        />
      )}
    </>
  );
}

export default VerCalificacion;
