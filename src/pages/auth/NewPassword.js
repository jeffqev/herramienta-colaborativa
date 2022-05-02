import React, {useContext, useState} from "react";
import "./login.css";
import AlertaContext from "../../context/alerta/alertaContext";
import Alerta from "../../components/layout/Alerta";
import {useHistory} from "react-router";
import recoveryContext from "../../context/auth/recoveryContext";
import UsuarioContext from "../../context/usuarios/usuarioContext";

export default function NewPassword() {
    const {userId} = useContext(recoveryContext);
    const usuarioContext = useContext(UsuarioContext);
    const {
        editarUsuario,
    } = usuarioContext;

    const history = useHistory();
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const [password, setPassword] = useState({});

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            if (password.trim() === "") {
                mostrarAlerta("todos los campos son requeridos", "danger");
                return;
            }

            try {
                let dataToUpdate = {
                    contrasena: password
                }
                await editarUsuario(userId, dataToUpdate);
                history.push(`/`);
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
                                Nueva Contraseña
                            </label>
                            <input
                                className="form-control"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Contraseña"
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