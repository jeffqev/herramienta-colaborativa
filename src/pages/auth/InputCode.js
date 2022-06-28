import React, {useContext, useState} from "react";
import "./login.css";
import AlertaContext from "../../context/alerta/alertaContext";
import Alerta from "../../components/layout/Alerta";
import bcrypt from 'bcryptjs';
import recoveryContext from "../../context/auth/recoveryContext";
import {useHistory} from "react-router-dom";

export default function InputCode() {
    const history = useHistory();
    const {code} = useContext(recoveryContext);
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const [codigo, setCodigo] = useState({});

    const handleChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (codigo.length === 0) {
            mostrarAlerta("todos los campos son requeridos", "danger");
            return;
        }
        const compareResult = await bcrypt.compare(
            codigo,
            code.replace(/slash/g, '/')
        );

        if (compareResult) {
            history.push('/newPassword')
        } else {
            mostrarAlerta("El codigo no coincide", "danger");
        }

    };

    return (
        <main className="body container">
            <div className="col-md-4 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h3 style={{textAlign: "center"}}>Validar Codigo</h3>
                        <img
                            className="img-fluid mx-auto d-block"
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/logo-ups.png`}
                            alt=""
                        />
                    </div>
                    <div className="card-body card-body-login">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="correo" className="form-label">
                                Codigo
                            </label>
                            <input
                                className="form-control"
                                id="codigo"
                                type="number"
                                name="codigo"
                                placeholder="Codigo"
                                onChange={handleChange}
                            />

                            <div className="d-grid gap-2">
                                <button
                                    type="submit"
                                    className="mt-3 btn btn-primary btn-block"
                                >
                                    Enviar
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