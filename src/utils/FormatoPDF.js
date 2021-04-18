import { capitalize, textReferencia } from ".";

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
  array.forEach((e) => {
    e.referencia.forEach((a) => {
      res += `<li>${textReferencia(a)}</li>`;
    });
  });

  return res;
}

export function docHeader(datos, solution = false) {
  const data = `
    <table style="border-collapse: collapse; width: 100%;" border="0">
      <tbody>
        <tr>
          <td style="width: 31.5146%;"><img src="https://www.ups.edu.ec/ups_portal-theme/images/ups/home/logo-ups-home.png" alt="" width="300" height="81" /></td>
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
    <p><strong>CONCLUCIONES:</strong></p>
    <ol>
      <li>Generar al menos una conclus&iacute;on de la pr&aacute;ctica desarrollada</li>
    </ol>
    <p><strong>REFERENCIAS:</strong></p>
    <ol>
      ${listRef(datos.ejercicios)}
    </ol>
    <p>Claustro Docente de Programaci&oacute;n - Quito</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Firma:____________________________</p>
    `;
  return data;
}

export const requests = {
  plantilla: {
    requisitos: [
      "Computador con sistema operativo Microsoft Windows, MacOS X o GNU/Linux",
      "Conexión a Internet",
    ],
    instrucciones: [
      "Lea detenidamente cada uno de los enunciados propuestos.",
      "Plantee una solución a cada uno de los ejercicios, utilizando las técnicas estudiadas para algoritmos.",
      "Desarrolle la solución planteada.",
      "Desarrolle la solución planteada.",
    ],
    resultados: [
      "Los alumnos adquieren destreza para describir alternativas de solución a los problemas a través de algoritmos.",
    ],
    objetivos: [
      "Aplicar la lógica de programación para solucionar problemas a través de algoritmos.",
    ],
    _id: "604f735054821308a4e0d87f",
    titulo: "algebra booleana",
    formato: "practica de laboratorio",
    temas: {
      _id: "604f695a54821308a4e0d879",
      nombre: "algebra booleana",
    },
    asignatura: {
      _id: "602b02acc7477f2b9c583fb8",
      nombre: "programación 1",
    },
    coordinador: "602af8de2f917f0f00cdf703",
  },
  ejercicios: [
    {
      referencia: [],
      _id: "6058d78f51b3913510741b2d",
      titulo: "masa de aire de un neumatico",
      descripcion:
        "desarrollar un algoritmo en pseudocódigo que calcule la masa de aire de un neumático de automóvil",
      dificultad: 2,
      tema: {
        _id: "604f69c654821308a4e0d87c",
        nombre: "algoritmo avanzado",
      },
      asignatura: {
        _id: "602b02acc7477f2b9c583fb8",
        nombre: "programación 1",
      },
      ejercicio:
        '<p>Desarrollar un algoritmo en pseudoc&oacute;digo que calcule la masa de aire de un neum&aacute;tico de autom&oacute;vil:</p>\n<p style="text-align: center;">m = pv / (t+ 460)0.37</p>\n<p><strong>Donde</strong>:</p>\n<ul>\n<li>p: es la presi&oacute;n en libras por pulgada cuadrada (psi)</li>\n<li>v: es el volumen en pies c&uacute;bicos (m<sup>3</sup>)</li>\n<li>t: es la temperatura en grados Fahrenheit</li>\n<li>m: es la masa del aire en libras</li>\n</ul>\n<p><strong>Instrucciones:</strong></p>\n<ol type="a">\n<li>\n<p>Pedir que el usuario ingrese por teclado la presi&oacute;n, el volumen y la temperatura.</p>\n</li>\n<li>\n<p>Calcular la masa de aire de acuerdo con la formula dada.</p>\n</li>\n<li>\n<p>Adjuntar el diagrama de flujo del algoritmo</p>\n</li>\n</ol>\n<p><img src="http://localhost:1323/images/83c4fe3977661bf6ff3414847106845e.JPG" alt="" width="367" height="446" /></p>\n<p><img id="hzDownscaled" style="position: absolute; top: -10000px;" /></p>',
      ejemplo: "",
      solucion:
        '<pre class="western">Algoritmo MASA_AIRE<br />definir p, v, t , m Como Real<br />Escribir "Ingrese la presi&oacute;n en psi:"<br />Leer p<br /><br />Escribir "ingrese el volumen en pies c&uacute;bicos:"<br /><br />Leer v<br /><br />Escribir "ingrese la temperatura en grados Fahrenheit:"<br /><br />Leer t<br /><br />m&lt;-(p* v)/ ((t+460)*0.37)<br /><br />Escribir "La masa de aire es:", m, " libras"<br /><br />Fin Algoritmo</pre>',
      docente: {
        rol: "docente",
        estado: true,
        registro: "2021-02-15T22:19:37.715Z",
        _id: "602af8de2f917f0f00cdf703",
        nombre: "docente",
        apellido: "1",
        correo: "docente1@docente.com",
      },
    },
    {
      referencia: [],
      _id: "6058d78f51b3913510741b2d",
      titulo: "masa de aire de un neumatico",
      descripcion:
        "desarrollar un algoritmo en pseudocódigo que calcule la masa de aire de un neumático de automóvil",
      dificultad: 2,
      tema: {
        _id: "604f69c654821308a4e0d87c",
        nombre: "algoritmo avanzado",
      },
      asignatura: {
        _id: "602b02acc7477f2b9c583fb8",
        nombre: "programación 1",
      },
      ejercicio:
        '<p>Desarrollar un algoritmo en pseudoc&oacute;digo que calcule la masa de aire de un neum&aacute;tico de autom&oacute;vil:</p>\n<p style="text-align: center;">m = pv / (t+ 460)0.37</p>\n<p><strong>Donde</strong>:</p>\n<ul>\n<li>p: es la presi&oacute;n en libras por pulgada cuadrada (psi)</li>\n<li>v: es el volumen en pies c&uacute;bicos (m<sup>3</sup>)</li>\n<li>t: es la temperatura en grados Fahrenheit</li>\n<li>m: es la masa del aire en libras</li>\n</ul>\n<p><strong>Instrucciones:</strong></p>\n<ol type="a">\n<li>\n<p>Pedir que el usuario ingrese por teclado la presi&oacute;n, el volumen y la temperatura.</p>\n</li>\n<li>\n<p>Calcular la masa de aire de acuerdo con la formula dada.</p>\n</li>\n<li>\n<p>Adjuntar el diagrama de flujo del algoritmo</p>\n</li>\n</ol>\n<p><img src="http://localhost:1323/images/83c4fe3977661bf6ff3414847106845e.JPG" alt="" width="367" height="446" /></p>\n<p><img id="hzDownscaled" style="position: absolute; top: -10000px;" /></p>',
      ejemplo: "",
      solucion:
        '<pre class="western">Algoritmo MASA_AIRE<br />definir p, v, t , m Como Real<br />Escribir "Ingrese la presi&oacute;n en psi:"<br />Leer p<br /><br />Escribir "ingrese el volumen en pies c&uacute;bicos:"<br /><br />Leer v<br /><br />Escribir "ingrese la temperatura en grados Fahrenheit:"<br /><br />Leer t<br /><br />m&lt;-(p* v)/ ((t+460)*0.37)<br /><br />Escribir "La masa de aire es:", m, " libras"<br /><br />Fin Algoritmo</pre>',
      docente: {
        rol: "docente",
        estado: true,
        registro: "2021-02-15T22:19:37.715Z",
        _id: "602af8de2f917f0f00cdf703",
        nombre: "docente",
        apellido: "1",
        correo: "docente1@docente.com",
      },
    },
    {
      referencia: [],
      _id: "6058d78f51b3913510741b2d",
      titulo: "masa de aire de un neumatico",
      descripcion:
        "desarrollar un algoritmo en pseudocódigo que calcule la masa de aire de un neumático de automóvil",
      dificultad: 2,
      tema: {
        _id: "604f69c654821308a4e0d87c",
        nombre: "algoritmo avanzado",
      },
      asignatura: {
        _id: "602b02acc7477f2b9c583fb8",
        nombre: "programación 1",
      },
      ejercicio:
        '<p>Desarrollar un algoritmo en pseudoc&oacute;digo que calcule la masa de aire de un neum&aacute;tico de autom&oacute;vil:</p>\n<p style="text-align: center;">m = pv / (t+ 460)0.37</p>\n<p><strong>Donde</strong>:</p>\n<ul>\n<li>p: es la presi&oacute;n en libras por pulgada cuadrada (psi)</li>\n<li>v: es el volumen en pies c&uacute;bicos (m<sup>3</sup>)</li>\n<li>t: es la temperatura en grados Fahrenheit</li>\n<li>m: es la masa del aire en libras</li>\n</ul>\n<p><strong>Instrucciones:</strong></p>\n<ol type="a">\n<li>\n<p>Pedir que el usuario ingrese por teclado la presi&oacute;n, el volumen y la temperatura.</p>\n</li>\n<li>\n<p>Calcular la masa de aire de acuerdo con la formula dada.</p>\n</li>\n<li>\n<p>Adjuntar el diagrama de flujo del algoritmo</p>\n</li>\n</ol>\n<p><img src="http://localhost:1323/images/83c4fe3977661bf6ff3414847106845e.JPG" alt="" width="367" height="446" /></p>\n<p><img id="hzDownscaled" style="position: absolute; top: -10000px;" /></p>',
      ejemplo: "",
      solucion:
        '<pre class="western">Algoritmo MASA_AIRE<br />definir p, v, t , m Como Real<br />Escribir "Ingrese la presi&oacute;n en psi:"<br />Leer p<br /><br />Escribir "ingrese el volumen en pies c&uacute;bicos:"<br /><br />Leer v<br /><br />Escribir "ingrese la temperatura en grados Fahrenheit:"<br /><br />Leer t<br /><br />m&lt;-(p* v)/ ((t+460)*0.37)<br /><br />Escribir "La masa de aire es:", m, " libras"<br /><br />Fin Algoritmo</pre>',
      docente: {
        rol: "docente",
        estado: true,
        registro: "2021-02-15T22:19:37.715Z",
        _id: "602af8de2f917f0f00cdf703",
        nombre: "docente",
        apellido: "1",
        correo: "docente1@docente.com",
      },
    },
  ],
};

export const requets2 = {
  ejercicios: [
    {
      referencia: [
        {
          colaboradores: ["Luis Joyanes"],
          _id: "6046207b1ad20004b4adb41f",
          titulo: "Fundamentos de Programación",
          anio: 2008,
          edicion: "4th",
          editorial: "McGraw-Hill",
          asignatura: "602b02acc7477f2b9c583fb8",
          tipo: "libro",
        },
      ],
      _id: "6064ef37810e740614e0c3e6",
      titulo: "tabla de multiplicar",
      descripcion: "escriba un programa denominado tablamultiplicar",
      dificultad: 1,
      tema: "6064ee44810e740614e0c3e5",
      asignatura: "602b02acc7477f2b9c583fb8",
      ejercicio:
        "<p>Escriba un programa denominado <strong>TablaMultiplicar </strong>que solicita al usuario el tama&ntilde;o (un entero positivo); e imprime la tabla de multiplicar.</p>\n<ul>\n<li><strong>Entrada</strong>: Un n&uacute;mero entero mayor a 0.</li>\n<li><strong>Salida</strong>: Tabla de multiplicar, seg&uacute;n formato establecido:</li>\n</ul>",
      ejemplo:
        "<pre>Ingrese el tama&ntilde;o de la tabla:<br />10<br />Tabla de multiplicar:<br />&nbsp;* | 1 2 3 4 5 6 7 8 9 10<br />--------------------------------------------<br /> 1 | 1  2  3  4  5  6  7  8  9  10<br /> 2 | 2  4  6  8  10 12 14 16 18 20<br /> 3 | 3  6  9  12 15 18 21 24 27 30<br /> 4 | 4  8  12 16 20 24 28 32 36 40<br /> 5 | 5  10 15 20 25 30 35 40 45 50<br /> 6 | 6  12 18 24 30 36 42 48 54 60<br /> 7 | 7  14 21 28 35 42 49 56 63 70<br /> 8 | 8  16 24 32 40 48 56 64 72 80<br /> 9 | 9  18 27 36 45 54 63 72 81 90<br />10 | 10 20 30 40 50 60 70 80 90 100&nbsp;</pre>",
      solucion: "",
      docente: "602af8de2f917f0f00cdf703",
    },
    {
      referencia: [
        {
          colaboradores: ["Héctor Flórez"],
          _id: "604f75ed54821308a4e0d880",
          titulo: "Sistemas digitales: principios, análisis y diseño",
          asignatura: "602b02acc7477f2b9c583fb8",
          tipo: "libro",
        },
      ],
      _id: "6064efdf810e740614e0c3e7",
      titulo: "cuenta de números consecutivos",
      descripcion: "programa imprima la cantidad de cifras que tiene el numero",
      dificultad: 1,
      tema: "6064ee44810e740614e0c3e5",
      asignatura: "602b02acc7477f2b9c583fb8",
      ejercicio:
        "<p>Realice un programa que permita ingresar un n&uacute;mero entero de varias cifras y el programa imprima la cantidad de cifras que tiene el numero.</p>\n<ul>\n<li><strong>Entrada</strong>: Un n&uacute;mero entero mayor a 0.</li>\n<li><strong>Salida</strong>: Tabla de multiplicar, seg&uacute;n formato establecido:</li>\n</ul>",
      ejemplo:
        "<pre>Ingrese un n&uacute;mero entero: 234567<br />Total de cifras: 6&nbsp;</pre>",
      solucion: "",
      docente: "602af8de2f917f0f00cdf703",
    },
    {
      referencia: [],
      _id: "6064f075810e740614e0c3e8",
      titulo: "serie armónica",
      descripcion: "conocer cuántos términos de la serie armónica",
      dificultad: 2,
      tema: "6064ee44810e740614e0c3e5",
      asignatura: "602b02acc7477f2b9c583fb8",
      ejercicio:
        "<p>Desarrollar un programa que permita conocer cu&aacute;ntos t&eacute;rminos de la serie arm&oacute;nica se necesitan para satisfacer la siguiente desigualdad:</p>\n<p>1/1 + 1/2 + 1/3 + &hellip;+1/n &gt; LIMITE</p>\n<p>Donde:</p>\n<ul>\n<li>LIMITE es el dato le&iacute;do desde el teclado entre 1 y 10 incluidos. Se debe validar el ingreso del dato</li>\n</ul>\n<p><strong>Entradas</strong>: Un n&uacute;mero real<br /><strong>Salida</strong>: Dos n&uacute;meros enteros. El n&uacute;mero de t&eacute;rminos y la suma de la serie</p>\n<p>&nbsp;</p>",
      ejemplo:
        "<pre>Ingrese el valor del LIMITE: 4<br />El n&uacute;mero de t&eacute;rminos es: 31<br />La suma es: 4.03</pre>",
      solucion: "",
      docente: "602af8de2f917f0f00cdf703",
    },
    {
      referencia: [],
      _id: "6064f0f0810e740614e0c3e9",
      titulo: "triángulo de números",
      descripcion: "generar un patrón numérico triangular",
      dificultad: 2,
      tema: "6064ee44810e740614e0c3e5",
      asignatura: "602b02acc7477f2b9c583fb8",
      ejercicio:
        "<p>Crear un programa que permita generar un patr&oacute;n num&eacute;rico triangular. El patr&oacute;n se genera a partir<br />de un n&uacute;mero entero ingresado por teclado.</p>\n<ul>\n<li><strong>Entradas</strong>: Un n&uacute;mero entero positivo</li>\n<li><strong>Salida</strong>: Patr&oacute;n num&eacute;rico&nbsp;</li>\n</ul>",
      ejemplo:
        "<pre>Ingrese un n&uacute;mero: 5<br />* * * * * *<br />0<br />0 1<br />0 1 2<br />0 1 2 3<br />0 1 2 3 4<br />0 1 2 3 4 5<br />0 1 2 3 4<br />0 1 2 3<br />0 1 2<br />0 1<br />0<br />* * * * * *</pre>",
      solucion: "",
      docente: "602af8de2f917f0f00cdf703",
    },
    {
      referencia: [],
      _id: "6064f19f810e740614e0c3ea",
      titulo: "patrón #",
      descripcion: "escriba un programa llamado patron #",
      dificultad: 3,
      tema: "6064ee44810e740614e0c3e5",
      asignatura: "602b02acc7477f2b9c583fb8",
      ejercicio:
        '<p>Escriba un programa llamado Patron # que solicitan al usuario el tama&ntilde;o (un entero no negativo) e<br />imprime el patr&oacute;n como se muestra:&nbsp;</p>\n<p><img src="http://localhost:1323/images/2178f5cba0ed6106bb359227470b3cb5.JPG" alt="" width="143" height="156" /></p>\n<ul>\n<li><strong>Entradas</strong>: Un n&uacute;mero entero positivo</li>\n<li><strong>Salida</strong>: El patr&oacute;n mostrado en la figura anterior</li>\n</ul>',
      ejemplo:
        "<pre>Ingrese un tama&ntilde;o: 6<br /># # # # # #<br />       #<br />      #<br />    #<br />  #<br /># # # # # #&nbsp;</pre>",
      solucion: "",
      docente: "602af8de2f917f0f00cdf703",
    },
  ],
  _id: "6065052ac33d4322300f502e",
  plantilla: {
    requisitos: [
      "Computador con sistema operativo Microsoft Windows, MacOS X o GNU/Linux",
      "Programa IDE para desarrollo",
      "Conexión a Internet",
    ],
    instrucciones: [
      "Lea detenidamente cada uno de los enunciados propuestos.",
      "Plantee una solución a cada uno de los ejercicios",
      "Desarrolle la solución planteada.",
      "Elabore un informe con la solución de los ejercicios.",
    ],
    resultados: [
      "Los alumnos adquieren destreza para trabajar con sentencias de control.",
    ],
    objetivos: [
      "Aplicar bucles de repetición para la solucionar problemas con programación",
    ],
    _id: "6064f454810e740614e0c3eb",
    titulo: "sentencias de repetición",
    formato: "practica de laboratorio",
    temas: "6064ee44810e740614e0c3e5",
    asignatura: "602b02acc7477f2b9c583fb8",
    coordinador: "602af8de2f917f0f00cdf703",
  },
  periodo: {
    _id: "602af9ed2f917f0f00cdf70d",
    periodo: 57,
  },
};
