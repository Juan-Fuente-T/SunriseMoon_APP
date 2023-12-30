import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

function ImputForm({ consultarSunrise }) {
    // Se define el estado para el input delusuario y la funcion que lo actualiza. Se inicializa como un string vacio.
    const [inputValue, setInputValue] = useState('');

    // Función para manejar cambios en el input
    const handleInputChange = (e) => {
        setInputValue(e.target.value); //e.target.value = valor actual en el momento del evento
        //console.log('Input Value:', e.target.value);
    };

    // Función para manejar clics en el botón de consulta
    const handleConsultaClick = () => {
        //console.log('Consultar Clicked');
        consultarSunrise(inputValue); // Llama a la función consultarSunrise con el valor actual del input asignado por el usuario como parametro
    };

    // Función para borrar el valor en una segunda consulta
    const handleInputClick = () => { // Borra el valor que se habia introducido anteriormente en el input
        setInputValue('');
    };


    // Función para manejar pulsaciones de tecla (Enter) en el input y pedir resultados
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            //console.log('Enter Pressed');
            consultarSunrise(inputValue); // Sellama a la función consultarSunrise cuando se presiona Enter con el inputValue asignado por el usuario como parametro
        }
    };

    return (
        <Box display={'flex'} flexDirection={['column', 'row']} justifyContent={'space-around'} alignItems={'center'} m={'2'} maxWidth={'100%'} >
            <Input
                type="text"
                color={'#FAFAFA'}
                placeholder={['Localidad o código postal']}
                _placeholder={{ color: '#FAFAFA' }}
                //_hover={{ _placeholder: { color: '#262626' } }}
                value={inputValue}
                onChange={handleInputChange} // Se asocia la función de cambio al evento onChange
                onClick={handleInputClick} // Se asocia la función de hacer click con el borrado del dato anterior
                onKeyDown={handleKeyPress}   // Se asocia la función de pulsación de tecla al evento onKeyPress
                fontSize={["xs", "sm", "md", "lg"]}
                maxWidth={['100%', '70%']}
                fontWeight="bold"
                textAlign={'center'}
                border={'2px'}
                borderColor={'#D4D4D8'}
                _hover={{ borderColor: '#262626', borderWidth: '3px', color: '#262626', backgroundColor: '#D4D4D8', _placeholder: { color: '#262626' } }}
                _focus={{ borderColor: '#D4D4D8' }}
                focusBorderColor='#262626'
                backgroundColor={'#262626'}
            />
            <Button m={'3'} maxWidth={["sm"]} fontSize={["sm", "md", "lg"]} border={'2px'}
                borderColor={'#262626'} color="#262626" backgroundColor={'#D4D4D8'} _hover={{ backgroundColor: '#262626', color: '#D4D4D8', borderColor: '#D4D4D8' }} onClick={handleConsultaClick}>
                Consultar
            </Button>
        </Box >
    );
}

export default ImputForm;