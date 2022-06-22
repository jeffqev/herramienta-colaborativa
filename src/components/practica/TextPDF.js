import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextPDF({ handleChange, editorPrint, initial }) {
  return (
    <Editor
      apiKey={process.env.REACT_APP_RICHTEXT_KEY}
      onEditorChange={handleChange}
      // disabled={true}
      textareaName="myTextArea"
      ref={editorPrint}
      init={{
        selector: "myTextArea",
        height: 10000,
        menubar: false,
        // readonly: true,
        plugins: [
          "advlist autolink lists link image charmap  preview anchor",
          "searchreplace visualblocks code print fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        images_upload_handler: example_image_upload_handler,
        // toolbar: `preview | print`,
      }}
      value={initial}
    />
  );
}

export default TextPDF;

function example_image_upload_handler(blobInfo, success, failure, progress) {
  let xhr, formData;

  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open("POST", process.env.REACT_APP_BACKEND_URL + "/upload");

  xhr.upload.onprogress = function (e) {
    progress((e.loaded / e.total) * 100);
  };

  xhr.onload = function () {
    let json;

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
