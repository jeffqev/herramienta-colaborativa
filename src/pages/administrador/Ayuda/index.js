import React, {useContext, useEffect} from "react";
import "../../../assets/statics/Manual_Coordinador.pdf";
import AuthContext from "../../../context/auth/authContext";
import Header from "../../../components/layout/Header";
import Nav from "../../../components/layout/Nav";
import Iframe from 'react-iframe'
import AntHeader from "../../../components/layout/AntHeader";
import PdfManual from "../../../../src/assets/statics/ManualAdministrador.pdf";
import PdfCoordinador from "../../../../src/assets/statics/Manual_Coordinador.pdf";

function Ayuda() {
    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [usuarioAutenticado]);

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
                                <Iframe url={usuario.rol === "administrador" ? PdfManual : PdfCoordinador}
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
        </>
    );
}

export default Ayuda;
