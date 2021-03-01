import React from "react";
import { List, Button, Row } from "antd";
import { EyeOutlined, RightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { capitalize } from "../../utils";

function Listado({ data }) {
  const history = useHistory();
  return (
    <>
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          pageSize: 5,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.titulo}>
            <List.Item.Meta
              avatar={
                <RightOutlined
                  onClick={() => history.push(`/practicas/${item._id}`)}
                  style={{ paddingTop: 12 }}
                />
              }
              title={
                <Button
                  className="button-list"
                  type="link"
                  onClick={() => history.push(`/practicas/${item._id}`)}
                >
                  {item.titulo.toUpperCase()}
                </Button>
              }
              description={
                <>
                  <Row justify="space-between">
                    <>
                      {capitalize(item?.asignatura.nombre)} {" | "}
                      {item?.temas.map(
                        (tema) => `${capitalize(tema.nombre)} | `
                      )}
                    </>
                    <EyeOutlined
                      style={{ marginLeft: 20 }}
                      onClick={() => history.push(`/practicas/${item._id}`)}
                    />
                  </Row>
                </>
              }
            />
            {capitalize(item.objetivo)}
          </List.Item>
        )}
      />
    </>
  );
}

export default Listado;
