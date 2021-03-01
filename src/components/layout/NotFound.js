import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
function NotFound() {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la pagina a visitar no existe."
      extra={
        <Button type="primary" onClick={() => history.goBack()}>
          Volver
        </Button>
      }
    />
  );
}

export default NotFound;
