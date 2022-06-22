import React, {useContext, useEffect} from "react";

import {Table, Button, Tag, Rate} from "antd";
import {CheckOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";

import EjercicioContext from "../../context/ejercicio/ejercicioContext";

import BotonEliminar from "../layout/extras/BotonEliminar";
import {
    capitalize,
    mostrarMsg,
    SumPuntaje,
    setTipoEjercicio,
    setColorDificultad,
    setDificultadText,
    setArchivado,
} from "../../utils";

import {useHistory} from "react-router-dom";
import Text from "antd/lib/typography/Text";

function VerEjercicio({idAsignatura, idusuario, tipo}) {
    const history = useHistory();

    // Datos globales con useContext para usar las ejercicio
    const ejercicioContext = useContext(EjercicioContext);
    const {
        ejercicios,
        temafiltro,
        msg,
        vaciarmsg,
        nuevocambio,
        buscarEjerciciosAsig,
        eliminarEjercicio,
        editarEjercicio,
    } = ejercicioContext;

    // Si hay cambios volver a hacer la consulta
    useEffect(() => {
        if (msg) {
            mostrarMsg(msg.texto, msg.tipo);
            vaciarmsg();
        }

        buscarEjerciciosAsig(idAsignatura);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nuevocambio, msg]);

    const handleEliminar = (id) => {
        eliminarEjercicio(id);
    };

    const handleVer = (id) => {
        history.push(`/ejercicios/${idAsignatura}/${id}`);
    };

    const handleModificar = (id) => {
        history.push(`/editar/ejercicios/${idAsignatura}/${id}`);
    };

    const handleDesarchivar = (id) => {
        editarEjercicio(id, {archivado: false});
    };

    const columns = [
        {
            title: "Periodo",
            dataIndex: "periodo",
            key: "periodo",
            render: (periodo) => periodo.periodo,
            sorter: (a, b) => a.periodo?.periodo - b.periodo?.periodo,
        },
        {
            title: "Titulo",
            dataIndex: "titulo",
            key: "titulo",
            render: (titulo) => capitalize(titulo),
        },
        {
            title: "Tema",
            dataIndex: "tema",
            key: "tema",
            render: (tema) => capitalize(tema?.nombre),

            filters: temafiltro,
            filterMultiple: false,
            onFilter: (value, record) => record.tema?.nombre.indexOf(value) === 0,
        },
        {
            title: "Dificultad",
            dataIndex: "dificultad",
            key: "dificultad",
            // defaultSortOrder: "descend",
            sorter: (a, b) => a.dificultad - b.dificultad,
            render: (dificultad) => (
                <Tag color={setColorDificultad(dificultad)}>
                    {setDificultadText(dificultad)}
                </Tag>
            ),
        },

        {
            title: "Docente",
            dataIndex: "docente",
            key: "docente",
            filterMultiple: false,
            render: (docente) => capitalize(`${docente.nombre.split(' ')[0]} ${docente.apellido[0]}.`),
        },

        {
            title: "Calificacion",
            dataIndex: "calificacion",
            key: "calificacion",
            sorter: (a, b) => {
                let aval = SumPuntaje(a.calificacion) / a.calificacion.length;
                if (isNaN(aval)) {
                    aval = 0;
                }

                let bval = SumPuntaje(b.calificacion) / b.calificacion.length;
                if (isNaN(bval)) {
                    bval = 0;
                }

                return aval - bval;
            },
            render: (calificacion) => (
                <Rate
                    allowHalf
                    disabled
                    defaultValue={SumPuntaje(calificacion) / calificacion.length}
                />
            ),
        },
        {
            title: "Tipo",
            dataIndex: "evaluacion",
            key: "evaluacion",
            filters: [
                {
                    text: "Practica",
                    value: "Practica",
                },
                {
                    text: "Evaluación",
                    value: "Evaluación",
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) =>
                setTipoEjercicio(record.evaluacion).texto.indexOf(value) === 0,

            render: (evaluacion) => (
                <Tag color={setTipoEjercicio(evaluacion).color}>
                    {setTipoEjercicio(evaluacion).texto}
                </Tag>
            ),
        },
        {
            title: "Archivado",
            dataIndex: "archivado",
            key: "archivado",
            render: (archivado) =>
                archivado ? (
                    <Tag color="red">{setArchivado(archivado)}</Tag>
                ) : (
                    <Tag color="green">{setArchivado(archivado)}</Tag>
                ),
            filters: [
                {
                    text: "Archivado",
                    value: "Archivado",
                },
                {
                    text: "Sin Archivar",
                    value: "Sin Archivar",
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) =>
                setArchivado(record.archivado).indexOf(value) === 0,
        },
        {
            title: "Acciones",
            render: (_text, refasignatura) => (
                <div>
                    <Button
                        type="link"
                        style={{padding: 0, marginRight: 5}}
                        shape="round"
                        icon={<EyeOutlined/>}
                        size={"small"}
                        onClick={() => {
                            handleVer(refasignatura._id);
                        }}
                    />

                    {refasignatura?.docente._id === idusuario ||
                    tipo === "coordinador" ? (
                        <>
                            <Button
                                type="link"
                                style={{padding: 0, marginRight: 5}}
                                shape="round"
                                icon={<EditOutlined/>}
                                size={"small"}
                                onClick={() => {
                                    handleModificar(refasignatura._id);
                                }}
                            />
                            {refasignatura?.archivado ? (
                                <Button
                                    type="link"
                                    style={{padding: 0, marginRight: 5}}
                                    shape="round"
                                    icon={<CheckOutlined/>}
                                    size={"small"}
                                    onClick={() => {
                                        handleDesarchivar(refasignatura._id);
                                    }}
                                ></Button>
                            ) : (
                                <BotonEliminar
                                    id={refasignatura._id}
                                    handleEliminar={handleEliminar}
                                />
                            )}
                        </>
                    ) : null}
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            rowClassName={(record, _index) => {
                return record?.archivado === true ? "table-row-dark" : "";
            }}
            dataSource={ejercicios}
            size="small"
            pagination={{position: ["bottomCenter"]}}
            showSorterTooltip={false}
            bordered
            rowKey="_id"
            scroll={{x: "50%"}}
            expandable={{
                expandedRowRender: ({descripcion}) =>
                    descripcion ? (
                        <>
                            <Text strong>Descripción: </Text>
                            <Text>{capitalize(descripcion)}</Text>
                        </>
                    ) : null,
            }}
        />
    );
}

export default VerEjercicio;
