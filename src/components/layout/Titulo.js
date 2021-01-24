import React from "react";
import { useHistory } from "react-router-dom";
import feather from "feather-icons";

export default function Titulo({ titulo }) {
  const history = useHistory();
  feather.replace();

  const enviarAtras = () => {
    history.goBack();
  };
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">{titulo}</h1>
      <div className="btn-toolbar mb-2 mb-md-0">
        <button
          type="button"
          className="btn btn-outline-secondary btn-circle "
          onClick={() => {
            enviarAtras();
          }}
        >
          <span data-feather="arrow-left"></span>
        </button>
      </div>
    </div>
  );
}
