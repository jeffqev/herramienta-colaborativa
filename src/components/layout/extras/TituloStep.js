import React from "react";
import { Steps } from "antd";

function TituloStep({ texto }) {
  const { Step } = Steps;
  return (
    <Steps style={{ marginBottom: 30 }}>
      <Step title="" icon={<></>} />
      <Step title={texto} icon={<></>} />
      <Step title="" icon={<></>} />
    </Steps>
  );
}

export default TituloStep;
