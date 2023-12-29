//import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';
import ImputForm from './components/ImputForm';
import SunriseDisplay from './components/SunriseDisplay';
import { ChakraProvider, Flex, Box, Heading, Divider, VStack } from '@chakra-ui/react';
import { sunrise } from './components/ConsultarSunrise';


function App() {
  // Definir estado inicial para los datos 
  const [sunriseMoonData, setSunriseMoonData] = useState({});


  async function consultarSunrise(inputValue) {
    try {
      const { sunriseTime, sunsetTime, moonData, moonImage, hasError } = await sunrise(inputValue);

      // Actualizar el estado con los datos obtenidos
      setSunriseMoonData({
        sunriseTime,
        sunsetTime,
        moonData,
        moonImage,
        hasError,
      });
      //console.log("ErrorAPP:", sunriseMoonData.hasError);
    } catch (error) {
      console.error(`Error al consultar la hora del amanecer/anocheer/fase lunar: ${error.message}`);
    }
  }


  return (
    <ChakraProvider>
      <Box p='3' mx="auto" maxW={['100%', '600px']} height={['100%', '790px']} backgroundColor={'#262626'} display="flex" flexDirection="column" justifyContent="center" alignItems={'center'} marginY="auto" overflow="hidden" >
        <Flex flexDirection={'row'} justifyContent={'center'}>
          {/* Se renderiza el componente ImputForm y se pasan los datos solares y de fase lunar como prop */}
          <Box textAlign="center" p={4} backgroundColor={'#52525B'} borderRadius="10px" maxWidth={'100%'}  >
            <Heading as="h1" fontSize={'xx-large'} color={'#D4D4D8'} >
              Consulta de horario solar y fase lunar
            </Heading>
            <ImputForm consultarSunrise={consultarSunrise} />
          </Box>
        </Flex>
        <Box>
          <Divider my={4} />
        </Box>

        {/* Se renderiza el componente SunriseDisplay y se pasan los datos solares y de fase lunar como prop */}
        <Box>
          {/*<SunriseDisplay sunriseMoonData={sunriseMoonData || {}} />*/}
          <SunriseDisplay sunriseMoonData={sunriseMoonData} />
        </Box>
      </Box>
    </ChakraProvider >

  );
}
export default App; // Se exporta el componente App para su uso 


/*    <Box p='3' mx="auto" maxW={['100%', '600px']} height={['1020px', '790px']} backgroundColor={'#262626'} display="flex" flexDirection="column" justifyContent="center" alignItems={'center'} marginY="auto" overflow="hidden" > */
