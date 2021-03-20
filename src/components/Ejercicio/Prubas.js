import React, { useState } from "react";
import RichText from "./RichText";

function Prubas() {
  const [rich, setrich] = useState("");
  return (
    <div>
      <br />
      <RichText htmleditor={rich} sethtmlEditor={setrich} />
    </div>
  );
}

export default Prubas;
