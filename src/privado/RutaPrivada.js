import React, {useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const RutaPrivada = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const {autenticado, cargando, usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return (
        <Route
            {...props}
            render={(item) =>
                !autenticado && !cargando ? (
                    <Redirect to="/"/>
                ) : (
                    <Component {...item} />
                )
            }
        />
    );
};

export default RutaPrivada;
