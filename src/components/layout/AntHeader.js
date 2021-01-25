import React from "react";
import { PageHeader } from "antd";
import { useHistory } from "react-router-dom";

function AntHeader({ titulo, subtitulo }) {
  const history = useHistory();

  const enviarAtras = () => {
    history.goBack();
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          enviarAtras();
        }}
        title={titulo}
        subTitle={subtitulo}
      />
    </div>
  );
}

export default AntHeader;
