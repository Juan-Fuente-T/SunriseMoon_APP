import React from 'react';
import { Box, Input, chakra } from '@chakra-ui/react';
//import '../stylesheets/keyframes.css'

//se define el elemento con las props(propiedades) que va a utilizar
function InfoWindow({ label, value, onChange, customClassName }) {
    // Se intenta renderizar el componente InfoWindow
    try {
        // Se devuelve un componente de caja que contiene una etiqueta y un cuadro de entrada
        return (
            <Box textColor="#262626" fontSize="1.9xl" fontWeight="bold" p={'0%'} mb={'0%'} mt={'0%'} justifyContent={'center'} alignItems={'center'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', overflow: 'visible' }}>

                {/* Contenedor que establece el estilo de borde, margen y desplazamiento horizontal */}
                <Box
                    borderWidth="5px"
                    borderRadius="10px"
                    textAlign={'center'}
                    mb="3"
                    borderColor={'#262626'}
                    //overflowX="auto"
                    width="90%"
                    //style={{ whiteSpace: 'nowrap' }}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible' }}
                >
                    {/* Cuadro de entrada de texto */}
                    <Input
                        maxWidth={['100%', '100%', '100%']}
                        fontSize={["sm", "md", "lg", "xl", "2xl"]}
                        fontWeight="bold"
                        mr={'1'}
                        ml={'1'}
                        //justifyContent={'center'}
                        textAlign={'center'}
                        border="none"
                        //textAlign={'center'}
                        type="text"
                        // Valor del cuadro de entrada que se muestra
                        value={value}
                        // Maneja el evento de cambio en el cuadro de entrada
                        onChange={(e) => onChange(e.target.value)} //e.target.value = valor actual en el momento del evento
                        // Aplica la clase CSS condicionalmente según la prop customClassName
                        className={customClassName}
                    />
                </Box>
            </Box>
        );
    } catch (error) {
        // Capturamos y manejamos errores si ocurren al renderizar el componente
        console.error("Error en Infowindow: ", error);
        // Devolvemos null y un mensaje de error si se produce una excepción
        return null;
    }
}

// Exportamos el componente InfoWindow con la capacidad de usar características de Chakra UI
export default chakra(InfoWindow);