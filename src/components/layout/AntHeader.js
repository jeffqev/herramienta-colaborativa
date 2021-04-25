import React from "react";
import { PageHeader } from "antd";

function AntHeader({ titulo, subtitulo }) {
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title={titulo}
        subTitle={subtitulo}
      />
    </div>
  );
}

export default AntHeader;
