import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";

import AntHeader from "../../../components/layout/AntHeader";
import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";

import CarreraForm from "../../../components/carreras/CarreraForm";
import VerCarreras from "../../../components/carreras/VerCarreras";

function Usuario() {
    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado} = authContext;
    const history = useHistory();

    useEffect(() => {
        if (usuario) {
            if (usuario?.rol !== "administrador") {
                history.push("/dashboard");
            }
        } else {
            usuarioAutenticado();
        }
        // eslint-disable-next-line
    }, [usuarioAutenticado]);

    if (!usuario) return null;

    return (
        <>
            <Header/>
            <Nav activa={"carreras"}/>
            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
                        <div className="row">
                            <AntHeader
                                titulo={"Carreras"}
                                subtitulo={"Gestión de carreras"}
                            />

                            <div className="col-md-9 mt-4">
                                <div className="container mt-2">
                                    <div className="row">
                                        <VerCarreras/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 mt-4">
                                <div className="card mt-2">
                                    <div className="card-header">
                                        <small>Agregar Nueva Carrera</small>
                                    </div>
                                    <div className="card-body">
                                        <CarreraForm/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Usuario;