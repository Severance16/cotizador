import { createContext, useState } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearResultado } from "../helpers";

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleCangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Una base
        let resultado = 2000

        // Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
   
        // Hay que restar el 3% por cada año
        resultado -= ((diferencia *3) * resultado) / 100

        // Europeo 30%, Americano 15% y Asiatico 5%

        resultado *= calcularMarca(datos.marca)

        // Basico 20% y Completo 50%
        resultado *= calcularPlan(datos.plan)
        
        //Formatear resultado
        resultado = formatearResultado(resultado)

        //Seteamos al hook el resultado
        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000)
    }

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleCangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext