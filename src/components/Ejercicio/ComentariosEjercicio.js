import {Col, Row} from "antd";
import Text from "antd/lib/typography/Text";
import {PATH_COMENTARIO} from "../../config/rutasAPI";
import clienteAxios from "../../config/axios";
import {useEffect, useState} from "react";
import {mostrarMsg} from "../../utils";

const ComentariosEjercicio = (data) => {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        let dataApi = buscarComentariosEjercicio(data.idEjercicio);
        dataApi.then(res => {
            setComentarios(res.data.data);
        }).catch(_err => {
            mostrarMsg("Error al buscar los comentarios", "error");
        });

    }, [data.idEjercicio]);

    const buscarComentariosEjercicio = (id) => {
        return clienteAxios.get(`${PATH_COMENTARIO}/ejercicio/${id}`);
    };

    return (
        <>
            {
                comentarios.map(comentario => (
                    <Row key={comentario._id}>
                        <Col style={{borderBottom: '1px so'}}>
                            <Row>
                                <Text>Usuario: {comentario.docente.nombre} {comentario.docente.apellido}</Text>
                            </Row>
                            <Row>
                                <Text>Comentario: {comentario.comentario}</Text>
                            </Row>
                        </Col>
                    </Row>
                ))
            }
        </>
    );

}
export default ComentariosEjercicio;
