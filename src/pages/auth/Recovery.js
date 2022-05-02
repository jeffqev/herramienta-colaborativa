import React, {useContext, useState} from "react";
import "./login.css";
import AlertaContext from "../../context/alerta/alertaContext";
import Alerta from "../../components/layout/Alerta";
import clienteAxios from "../../config/axios";
import {PATH_RESTABLECER_CONTRASENA} from "../../config/rutasAPI";
import {useHistory} from "react-router";
import recoveryContext from "../../context/auth/recoveryContext";

export default function Recovery() {
    const {setCorreo, setCode, setUserId} = useContext(recoveryContext);
    const history = useHistory();
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const [correo, setCorreoInput] = useState({});

    const handleChange = (e) => {
        setCorreoInput(e.target.value);
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            if (correo.trim() === "") {
                mostrarAlerta("todos los campos son requeridos", "danger");
                return;
            }
            let rand = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);
            let data = {
                correo,
                'code': rand
            }
            try {
                const respuesta = await clienteAxios.post(PATH_RESTABLECER_CONTRASENA, data);
                setCorreo(correo);
                setCode(respuesta.data.code)
                setUserId(respuesta.data.userId)
                history.push(`/input`);
            } catch (error) {
                mostrarAlerta(error.response.data.msg, "danger");
            }
        }
    ;

    return (
        <main className="body container">
            <div className="col-md-4 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h3 style={{textAlign: "center"}}>Recuperar contraseña</h3>
                        <img
                            className="img-fluid mx-auto d-block"
                            src="https://quicklab-qa.herokuapp.com/images/logo-ups.png"
                            alt=""
                        />
                    </div>
                    <div className="card-body card-body-login">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="correo" className="form-label">
                                Correo electronico
                            </label>
                            <input
                                className="form-control"
                                id="correo"
                                type="email"
                                name="correo"
                                placeholder="Correo"
                                onChange={handleChange}
                            />

                            <div className="d-grid gap-2">
                                <button
                                    type="submit"
                                    className="mt-3 btn btn-primary btn-block"
                                >
                                    Restablecer
                                </button>
                            </div>
                            <br/>
                        </form>
                    </div>
                </div>
                {alerta ? <Alerta alerta={alerta}/> : null}
            </div>
        </main>
    );
}