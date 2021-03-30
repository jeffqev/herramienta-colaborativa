import React, { useState } from "react";
import { Button, Table } from "antd";

function Prubas() {
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [completo, setcompleto] = useState(false);

  const handleConfirmar = () => {
    if (selectedRowKeys.length !== 5) {
      alert("Seleccionar los 5");
      return;
    }

    setcompleto(true);
    alert(selectedRowKeys);
  };
  const onSelectChange = (rows) => {
    console.log(rows);
    if (rows.length > 5) {
      alert("Solo puede seleccionar 5");
      return;
    }
    setselectedRowKeys(rows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: () => ({
      disabled: completo,
    }),
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Dificultad",
      dataIndex: "age",
    },
    {
      title: "Descripcion",
      dataIndex: "address",
    },
  ];

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Ejercicio ${i}`,
      age: 5,
      address: `Descripcion ${i}`,
    });
  }

  return (
    <div className="container">
      <br />
      <span>
        <Button onClick={handleConfirmar}>Confirmar</Button>
        <span style={{ marginLeft: 8 }}>
          {`Seleccionados ${selectedRowKeys.length} ejercicios de 5`}
        </span>
      </span>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

export default Prubas;
