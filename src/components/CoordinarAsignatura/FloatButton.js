import React from "react";

import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import {
  PlusOutlined,
  UserAddOutlined,
  DiffOutlined,
  AuditOutlined,
} from "@ant-design/icons";

function FloatButton() {
  return (
    <>
      <Fab
        mainButtonStyles={{ color: "white", backgroundColor: "#1890ff" }}
        onClick={() => {
          alert("1");
        }}
        icon={<PlusOutlined style={{ fontSize: 25 }} />}
        alwaysShowTitle={true}
      >
        <Action
          text="Docentes"
          style={{ color: "white", backgroundColor: "#85a5ff" }}
          onClick={() => {
            alert("1");
          }}
        >
          <UserAddOutlined style={{ fontSize: 20 }} />
        </Action>

        <Action
          text="Practicas"
          style={{ color: "white", backgroundColor: "#85a5ff" }}
          onClick={() => {
            alert("1");
          }}
        >
          <AuditOutlined style={{ fontSize: 20 }} />
        </Action>

        <Action
          text="Ejercicios"
          style={{ color: "white", backgroundColor: "#85a5ff" }}
          onClick={() => {
            alert("1");
          }}
        >
          <DiffOutlined style={{ fontSize: 20 }} />
        </Action>
      </Fab>
    </>
  );
}

export default FloatButton;
