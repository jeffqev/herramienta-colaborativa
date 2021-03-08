import React, { useReducer } from "react";

import DashboardContext from "./dashboardContext";
import DashboardReducer from "./dashboardReducer";

import { GUARDAR_ASIGNATURA } from "../../types";

const DashboardState = (props) => {
  const initialState = {
    asignaturaid: null,
    tipoasignatura: null,
  };

  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const guardarAsignatura = async (asignatura, tipo) => {
    dispatch({
      type: GUARDAR_ASIGNATURA,
      payload: { asignatura, tipo },
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        asignaturaid: state.asignaturaid,
        tipoasignatura: state.tipoasignatura,
        guardarAsignatura,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
