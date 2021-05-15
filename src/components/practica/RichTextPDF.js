import React, { useState, useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { docHeader } from "../../utils/FormatoPDF";
import { Radio, Row } from "antd";
import PracticaContext from "../../context/practica/practicaContext";
import { mostrarMsg } from "../../utils";
import { useHistory } from "react-router-dom";

function RichText({ requets2, tipopractica, idpractica, idAsignatura }) {
  const tipoPractica = tipopractica === "normal" ? false : true;
  const [initial, setInitial] = useState(docHeader(requets2, tipoPractica));

  // Variables globales de practicas
  const practicaContext = useContext(PracticaContext);
  const { msg, vaciarmsg, modificarPractica, nuevocambio } = practicaContext;

  const history = useHistory();

  useEffect(() => {
    if (msg) {
      mostrarMsg(msg.texto, msg.tipo);
      vaciarmsg();
      history.push(`/practicas/${idAsignatura}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevocambio]);

  const handleChange = (content, editor) => {
    setInitial(content);
  };

  const handleGuardar = () => {
    const inicio = `<div style="zoom: 0.55;">`;
    const fin = `</div>`;
    if (!tipoPractica) {
      const data = {
        final: `${inicio}${initial}${fin}`,
      };
      modificarPractica(idpractica, data);
      return;
    }
    if (tipoPractica) {
      const data = {
        finalSolucion: `${inicio}${initial}${fin}`,
      };
      modificarPractica(idpractica, data);
      return;
    }
  };

  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Radio.Group size="large" defaultValue="1">
          <Radio.Button onClick={handleGuardar} value="3">
            Confirmar {!tipoPractica ? "Practica" : "Practica con solución"}
          </Radio.Button>
        </Radio.Group>
      </Row>
      <Editor
        apiKey={process.env.REACT_APP_RICHTEXT_KEY}
        onEditorChange={handleChange}
        // disabled={true}
        textareaName="myTextArea"
        init={{
          selector: "myTextArea",
          language: "es",
          height: 10000,
          // menubar: false,
          // readonly: true,
          plugins: [
            "advlist autolink lists link image charmap  preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime table paste code wordcount",
          ],
          images_upload_handler: example_image_upload_handler,
          toolbar: false,
        }}
        value={initial}
      />
    </>
  );
}

export default RichText;

function example_image_upload_handler(blobInfo, success, failure, progress) {
  var xhr, formData;

  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open("POST", process.env.REACT_APP_BACKEND_URL + "/upload");

  xhr.upload.onprogress = function (e) {
    progress((e.loaded / e.total) * 100);
  };

  xhr.onload = function () {
    var json;

    if (xhr.status === 403) {
      failure("HTTP Error: " + xhr.status, { remove: true });
      return;
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      failure("HTTP Error: " + xhr.status);
      return;
    }

    json = JSON.parse(xhr.responseText);

    if (!json || typeof json.location != "string") {
      failure("Invalid JSON: " + xhr.responseText);
      return;
    }

    success(json.location);
  };

  xhr.onerror = function () {
    failure(
      "Image upload failed due to a XHR Transport error. Code: " + xhr.status
    );
  };

  formData = new FormData();
  formData.append("file", blobInfo.blob(), blobInfo.filename());

  xhr.send(formData);
}
