import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function RichText({ htmleditor, sethtmlEditor }) {
  const handleChange = (content, editor) => {
    sethtmlEditor(content);
  };
  return (
    <Editor
      value={htmleditor}
      apiKey={process.env.REACT_APP_RICHTEXT_KEY}
      init={{
        height: 300,
        language: "es",
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar: `fullscreen | undo redo | formatselect | bold italic backcolor | 
             alignleft aligncenter alignright alignjustify | 
             bullist numlist outdent indent | removeformat | charmap |
             table | media image | searchreplace `,
        // paste_as_text: true,
        images_upload_handler: example_image_upload_handler,
      }}
      onEditorChange={handleChange}
    />
  );
}

export default RichText;

function example_image_upload_handler(blobInfo, success, failure, progress) {
  var xhr, formData;

  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open("POST", "http://localhost:1323/upload");

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
