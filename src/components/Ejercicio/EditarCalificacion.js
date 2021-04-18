import React, { useContext, useEffect } from "react";
import { Alert, Rate } from "antd";
import CalificacionContext from "../../context/calificacion/calificacionContext";

function EditarCalificacion({ idEjercicio }) {
  // Datos globales con useContext para usar las calificacions
  const calificacionContext = useContext(CalificacionContext);
  const {
    msg,
    calificacion,
    buscarCalificaciones,
    editarCalificacion,
    nuevocambio,
  } = calificacionContext;

  useEffect(() => {
    buscarCalificaciones(idEjercicio);
    console.log(calificacion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, nuevocambio]);

  // Validar datos y guardar en la db
  // const onFinish = (values) => {
  //   const { calificacion } = values;
  //   calificacion.ejercicio = idEjercicio;
  //   crearCalificacion(calificacion);
  //   // form.resetFields();
  // };

  // const handleChange = (value) => {
  //   console.log(value);
  // };

  return (
    <>
      {calificacion[0].puntaje ? (
        <>
          <Rate
            onChange={(value) => {
              editarCalificacion(calificacion[0]._id, { puntaje: value });
            }}
            allowHalf
            defaultValue={calificacion[0]?.puntaje}
          />
        </>
      ) : (
        <Alert
          message="El ejercicio no cuenta con una calificacion"
          type="success"
          showIcon
        />
      )}
    </>
  );
}

export default EditarCalificacion;
