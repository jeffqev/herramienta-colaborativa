import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Migas({ rutas }) {
  const { Item } = Breadcrumb;
  return (
    <div className="sombra">
      <Breadcrumb>
        {rutas.map((ruta) =>
          ruta.path ? (
            <Item key={ruta.path}>
              <Link to={ruta.path}>{ruta.nombre}</Link>
            </Item>
          ) : (
            <Item key={ruta.path}>{ruta.nombre}</Item>
          )
        )}
      </Breadcrumb>
    </div>
  );
}

export default Migas;
