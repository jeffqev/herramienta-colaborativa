import {Button, Col, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";
import Text from "antd/lib/typography/Text";
import {PATH_COMENTARIO} from "../../config/rutasAPI";
import clienteAxios from "../../config/axios";
import {mostrarMsg} from "../../utils";

const ComentarioEjercicio = (data) => {

    const [comentario, setComentario] = useState('');


    const handleChange = (e) => {
        setComentario(e.target.value);
    };
    const handleInsertComentario = async () => {
        let dataToCreate = {
            comentario,
            ejercicio: data.data.id
        };

        try {
            await clienteAxios.post(`${PATH_COMENTARIO}/`, dataToCreate);
            mostrarMsg("Añadir comentario", "success");
        } catch (error) {
            mostrarMsg("Añadir comentario", "error");
        }
    };

    const handleUpdateComentario = async () => {
        let dataToUpdate = {
            comentario,
            ejercicio: data.data.id
        };

        try {
            await clienteAxios.put(`${PATH_COMENTARIO}/${data.data.miComentarioId}`, dataToUpdate);
            mostrarMsg("Actualizar comentario", "success");
        } catch (error) {
            mostrarMsg("Actualizar comentario", "error");
        }
    };

    return (
        <>
            <Row>
                <Col>
                    <Text strong>Comentario: </Text>
                    <TextArea
                        onChange={handleChange}
                        placeholder="Escribe aquí tu comentario"
                        defaultValue={data.data.miComentario}
                    />
                </Col>
            </Row>
            <Row>
                {
                    data.data.miComentario !== '' ?
                        <Col style={{marginTop: 2}}>
                            <Button type="primary" onClick={handleUpdateComentario}>
                                Editar Comentario
                            </Button>
                        </Col>
                        :
                        <Col style={{marginTop: 2}}>
                            <Button type="primary" onClick={handleInsertComentario} disabled={comentario === ''}>
                                Agrear Comentario
                            </Button>
                        </Col>
                }
            </Row>
        </>
    );

}
export default ComentarioEjercicio;
