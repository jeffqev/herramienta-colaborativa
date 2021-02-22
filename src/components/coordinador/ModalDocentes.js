import React from "react";
import { List } from "antd";
import { UserOutlined } from "@ant-design/icons";

function ModalDocentes({ docente }) {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={docente}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              avatar={<UserOutlined />}
              title={`${item.nombre} ${item.apellido}`}
              description={item.correo}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default ModalDocentes;
