import { Breadcrumb } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

function Migas({ rutas }) {
  const { Item } = Breadcrumb;

  const history = useHistory();
  return (
    <div className="sombra">
      <Breadcrumb>
        {rutas.map((ruta) =>
          ruta.path ? (
            <Item href onClick={() => history.push(ruta.path)}>
              {ruta.nombre}
            </Item>
          ) : (
            <Item>{ruta.nombre}</Item>
          )
        )}
      </Breadcrumb>
    </div>
  );
}

export default Migas;
