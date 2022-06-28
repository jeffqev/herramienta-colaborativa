import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "../../../assets/statics/Manual_Coordinador.pdf";
import AuthContext from "../../../context/auth/authContext";
import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import Iframe from 'react-iframe'
import AntHeader from "../../../components/layout/AntHeader";
import PdfManual from "../../../../src/assets/statics/Manual_Coordinador.pdf";

function Ayuda() {
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
    }, [usuarioAutenticado]);

    if (!usuario) return null;

    return (
        <>
            <Header/>
            <Nav activa={"ayuda"}/>
            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="row">
                            <AntHeader
                                titulo={"Ayuda"}
                                subtitulo={"Manual de usuario"}
                            />
                            <div className="mt-4 row">

                                <Iframe url={PdfManual}
                                        width="900px"
                                        height="800px"
                                        overflow="hidden"
                                        display="initial"
                                />

                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {/*<div className="modal">*/}
            {/*    <div className="modalContent">*/}
            {/*        <iframe src="../../../assets/statics/hola.pdf" style="width:600px; height:500px;"*/}
            {/*                frameBorder="0"></iframe>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Iframe url="../../../assets/statics/hola.pdf"*/}
            {/*        width="450px"*/}
            {/*        height="450px"*/}
            {/*        id="myId"*/}
            {/*        className="myClassname"*/}
            {/*        display="initial"*/}
            {/*        position="relative"/>*/}

        </>
    );
}

export default Ayuda;
