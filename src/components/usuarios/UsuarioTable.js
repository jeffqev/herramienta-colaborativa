import React, { useContext, useEffect } from "react";
import UsuarioContext from "../../context/usuarios/usuarioContext";

export default function UsuarioTable() {
  // Datos globales con useContext para usar los usuarios
  const usuarioContext = useContext(UsuarioContext);
  const {
    usuarios,
    nuevousuario,
    buscarUsuarios,
    eliminarUsuario,
  } = usuarioContext;

  useEffect(() => {
    buscarUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuevousuario]);

  const eliminarUsuariotable = (id) => {
    eliminarUsuario(id);
  };

  return (
    <>
      <div className="card mt-2">
        <div className="card-body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Correo</th>
                <th scope="col">Rol</th>
                <th scope="col"> Accion </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        eliminarUsuariotable(usuario._id);
                      }}
                    >
                      eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
