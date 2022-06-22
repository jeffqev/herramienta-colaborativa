import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";

import AuthContext from "../../../context/auth/authContext";
import AsignaturaContext from "../../../context/asignatura/asignaturaContext";

import Header from "../../../components/layout/Header";
import Migas from "../../../components/layout/Migas";
import Nav from "../../../components/layout/Nav";
import {capitalize} from "../../../utils";
import {Col, Row, Typography} from "antd";
import ModalFloat from "../../../components/CoordinarAsignatura/ModalFloat";
import ReporteUsos from "../../../components/reportes/ReporteUsos";
import ReporteCalificacion from "../../../components/reportes/ReporteCalificacion";
import ModalDocentes from "../../../components/coordinador/ModalDocentes";
import ReporteTemas from "../../../components/reportes/ReporteTemas";

function Inicio() {
    const {Text, Title} = Typography;

    // Rutas
    const history = useHistory();
    const {id} = useParams();

    // asignatura seleccionada
    const [asignatura, setAsignatura] = useState("");
    const [tipo, setTipo] = useState("");

    // Variables globales usuario logueado
    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado} = authContext;

    // Variables globales de asignaturas
    const asignaturaContext = useContext(AsignaturaContext);
    const {
        nuevocambio,
        asignaturas,
        asignaturasDocente,
        buscarAsignaturasCoordinador,
        buscarAsignaturasDocente,
    } = asignaturaContext;

    useEffect(() => {
        if (usuario) {
            if (usuario?.rol === "administrador") {
                history.push("/usuarios");
            }
        } else {
            usuarioAutenticado();
        }

        // Cargar las asignaturas que coordina y las que es docente
        buscarAsignaturasCoordinador();
        buscarAsignaturasDocente();
        // Verificar si es coordinador o docente de dicha asignatura
        if (asignaturas) {
            //Busqueda si es coordinador
            const busqueda = asignaturas.find((item) => item._id === id);
            if (!busqueda) {
                //Busqueda si es docente
                const busquedaDocente = asignaturasDocente.find(
                    (item) => item._id === id
                );
                if (!busquedaDocente) {
                    history.push(`/dashboard`);
                } else {
                    setAsignatura(busquedaDocente);
                    setTipo("docente");
                }
            } else {
                setAsignatura(busqueda);
                setTipo("coordinador");
            }
        }

        // eslint-disable-next-line
    }, [usuarioAutenticado, nuevocambio]);

    const rutas = [
        {
            path: "/dashboard",
            nombre: "Dashboard",
        },
        {
            path: null,
            nombre: capitalize(asignatura.nombre),
        },
    ];

    if (!usuario) return null;

    return (
        <>
            <Header/>
            <Nav activa={"asignatura"}/>

            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
                        <div className="row">
                            <Migas rutas={rutas}/>
                        </div>
                        {asignatura.nombre ? (
                            <>
                                <Row
                                    className="d-flex justify-content-center text-center"
                                    style={{marginBottom: 20}}
                                >
                                    <Col style={{marginTop: 20}} md={24}>
                                        <Title level={4}>{asignatura?.nombre.toUpperCase()}</Title>

                                        <Text>{capitalize(asignatura?.carrera.carrera)} </Text>
                                        <br/>
                                        <Text>Código: {capitalize(asignatura?.codigo)} </Text>
                                    </Col>
                                </Row>

                                <div className="row mb-5">
                                    <div className="col-md-4">
                                        {tipo === "coordinador" ? (
                                            <div className="col-md-12">
                                                <div className="card  mt-3">
                                                    <div className="card-header">
                                                        <small>Docentes</small>
                                                    </div>
                                                    <div className="card-body">
                                                        <ModalFloat asignatura={asignatura}/>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="col-md-12">
                                                <div className="card  mt-3">
                                                    <div className="card-header">
                                                        <small>Docentes</small>
                                                    </div>
                                                    <div className="card-body">
                                                        <ModalDocentes docente={asignatura?.docentes}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="col-md-12">
                                            <div className="card  mt-3">
                                                <div className="card-header">
                                                    <small>Ejercicios por temas</small>
                                                </div>
                                                <div className="card-body">
                                                    <ReporteTemas idAsignatura={id}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="col-md-12">
                                            <div className="card  mt-3">
                                                <div className="card-header">
                                                    <small>Uso de ejercicios</small>
                                                </div>
                                                <div className="card-body">
                                                    <ReporteUsos idAsignatura={id}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="card  mt-3">
                                                <div className="card-header">
                                                    <small>Calificación ejercicios</small>
                                                </div>
                                                <div className="card-body">
                                                    <ReporteCalificacion idAsignatura={id}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Inicio;
