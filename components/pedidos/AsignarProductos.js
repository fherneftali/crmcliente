import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            existencia
            precio
        }
    }
`;

const AsignarProductos = () => {

    // State local del componente
    const [productos, setProductos] = useState([]);
    
    // Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const {agregarProducto} = pedidoContext;


    // Consulta a la bd
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
    
    useEffect(() => {
        // TODO: Funcion para pasar a PedidoState.js
        agregarProducto(productos);
    }, [productos])
    
    const seleccionarProducto = producto => {
        setProductos(producto)
    }
    
    if (loading) return null;
    const { obtenerProductos } = data;
    
    return (  
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2.- Selecciona o busca los productos</p>
            <Select 
                className="mt-3"
                options={obtenerProductos}
                isMulti={true}
                onChange={opcion => seleccionarProducto(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                placeholder="Busque o Seleccione el producto"
                noOptionsMessage={() => "No hay resultados"}
            />
        </>
    );
}
 
export default AsignarProductos;