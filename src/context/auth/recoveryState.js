import {useState} from "react";

const useRecovery = () => {
    const [{correo, code, userId}, setRecovery] = useState({
        correo: '',
        code: '',
        userId: ''
    })
    const setCorreo = (newCorreo) => {
        setRecovery(prev => ({...prev, correo: String(newCorreo)}));
    }

    const setCode = (newCode) => {
        setRecovery(prev => ({...prev, code: newCode}));
    }

    const setUserId = (newUserId) => {
        setRecovery(prev => ({...prev, userId: newUserId}));
    }

    return {
        correo,
        code,
        userId,
        setCorreo,
        setCode,
        setUserId
    }
}
export default useRecovery;