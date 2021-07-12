import { capitalize, eliminarReferenciasDuplicado, textReferencia } from ".";

function listLI(array, style = false) {
  let res = "";
  array.forEach((e) => {
    if (style) {
      res += `<li style="text-align: left;">${e}</li>`;
    } else {
      res += `<li>${e}</li>`;
    }
  });
  return res;
}

function listEjercicio(array, solution = false) {
  let res = ``;
  array.forEach((e) => {
    res += `
      <li><strong>${capitalize(e.titulo)}</strong>
        <ol>
          <li style="list-style-type: none;">
            ${e.ejercicio}
            <p>&nbsp;</p>
            ${
              e.ejemplo
                ? `
              <p><strong>Ejemplo:</strong></p>
              <table style="border-collapse: collapse; width: 94.1691%;" border="1">
                <tbody>
                  <tr>
                    <td style="width: 98.856%;">${e.ejemplo}</td>
                  </tr>
                </tbody>
              </table>
              <p>&nbsp;</p>
              `
                : ""
            }
            ${
              solution && e.solucion
                ? `
              <p><span style="color: #e03e2d;"><strong>Solución</strong></span></p>
              <table style="border-collapse: collapse; width: 94.1691%;" border="1">
                <tbody>
                  <tr>
                    <td style="width: 98.856%;">${e.solucion}</td>
                  </tr>
                </tbody>
              </table>
              <p>&nbsp;</p>
              `
                : ""
            }
          </li>
        </ol>
      </li>
    `;
  });
  return res;
}

function listRef(array) {
  let res = "";
  const arrayReferencia = [];

  array.forEach((e) => {
    e.referencia.forEach((referencia) => {
      arrayReferencia.push(referencia);
    });
  });

  const arraySinDuplicados = eliminarReferenciasDuplicado(arrayReferencia);
  arraySinDuplicados.map(
    (referencia) => (res += `<li>${textReferencia(referencia)}</li>`)
  );
  return res;
}

export function docHeader(datos, solution = false) {
  const data = `
    <table style="border-collapse: collapse; width: 100%;" border="0">
      <tbody>
        <tr>
          <td style="width: 31.5146%;"><img src="${
            process.env.REACT_APP_BACKEND_URL
          }/images/logo-ups.png" alt="" width="300" height="81" /></td>
          <td style="width: 31.2285%; text-align: center;">
            <p><strong>VICERRECTORADO DOCENTE</strong></p>
            <p>CONSEJO ACADEMICO</p>
          </td>
          <td style="width: 34.553%;">
            <p><strong>C&oacute;digo: </strong>GUIA PRL 001</p>
            <p><strong>Aprobaci&oacute;n: </strong>2016/04/06</p>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="text-align: center;"><strong>Formato:</strong> ${capitalize(
      datos.plantilla.formato
    )}</p>
    <p style="text-align: center;"><strong>FORMATO DE ${datos.plantilla.formato.toUpperCase()}</strong><br /><strong>PARA DOCENTES</strong></p>
    <table style="border-collapse: collapse; width: 100%;" border="0">
      <tbody>
        <tr>
          <td style="width: 49.0781%;"><strong>CARRERA:</strong> ${capitalize(
            datos.plantilla?.asignatura?.carrera?.carrera
          )}</td>
          <td style="width: 49.0781%;"><strong>ASIGNATURA: </strong>${capitalize(
            datos.plantilla?.asignatura?.nombre
          )}</td>
        </tr>
        <tr>
          <td style="width: 49.0781%;"><strong>PRACTICA:</strong> ${
            datos.plantilla?.numero
          }</td>
          <td style="width: 49.0781%;"><strong>T&Iacute;TULO: </strong>${capitalize(
            datos.plantilla?.titulo
          )}</td>
        </tr>
      </tbody>
    </table>
    <p style="text-align: left;">&nbsp;<br /><strong>OBJETIVO:</strong></p>
    <ul>
        ${listLI(datos.plantilla.objetivos, true)}
    </ul>
    <p><strong>PRE-REQUISITOS:</strong></p>
    <ol style="list-style-type: lower-alpha;">
        ${listLI(datos.plantilla.requisitos)}
    </ol>
    <p><strong>INSTRUCCIONES:</strong></p>
    <ol>
        ${listLI(datos.plantilla.instrucciones)}
    </ol>
    <p><strong>ACTIVIDADES A DESARROLLAR:</strong></p>
    <ol>
      ${listEjercicio(datos.ejercicios, solution)}
    </ol>
    <p><strong>RESULTADOS OBTENIDOS:</strong></p>
    <ol>
      ${listLI(datos.plantilla.resultados)}
    </ol>
    <p><strong>CONCLUSIONES:</strong></p>
    <ol>
      <li>Generar al menos una conclus&iacute;on de la pr&aacute;ctica desarrollada</li>
    </ol>
    <p><strong>REFERENCIAS:</strong></p>
    <ol>
      ${listRef(datos.ejercicios)}
    </ol>
    <p>Claustro Docente de ${capitalize(
      datos.plantilla?.asignatura?.nombre
    )} - Quito</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Firma:____________________________</p>
    `;
  return data;
}
