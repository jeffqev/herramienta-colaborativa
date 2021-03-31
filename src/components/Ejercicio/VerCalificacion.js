import React, { useContext, useEffect } from "react";
import { Rate } from "antd";
import CalificacionContext from "../../context/calificacion/calificacionContext";

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
    console.log(SumArray(calificacionesEjercicio));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio]);

  // Validar datos y guardar en la db
  // const onFinish = (values) => {
  //   const { calificacion } = values;
  //   calificacion.ejercicio = idEjercicio;
  //   crearCalificacion(calificacion);
  //   // form.resetFields();
  // };

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <>
      {calificacionesEjercicio.length !== 0 ? (
        <Rate
          onChange={handleChange}
          allowHalf
          disabled
          defaultValue={
            SumArray(calificacionesEjercicio) / calificacionesEjercicio.length
          }
        />
      ) : null}
    </>
  );
}

export default VerCalificacion;

function SumArray(array) {
  let total = 0;
  for (const i in array) {
    total += array[i].puntaje;
  }
  return total;
}
