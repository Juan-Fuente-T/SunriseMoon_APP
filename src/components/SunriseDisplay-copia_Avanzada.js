import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading, Divider, Flex, ChakraProvider, Text, useBreakpointValue, extendTheme, space } from '@chakra-ui/react';
import InfoWindow from './InfoWindow';


// Define el componente WeatherDisplay
function SunriseDisplay({ sunriseData }) {
    // Se extraen los datos iniciales de sunriseData
    const initialSunriseData = sunriseData || {};

    // Se inicializan los estados con los datos iniciales
    const [currentSunriseData, setCurrentSunriseData] = useState(initialSunriseData);

    //const initialRespuestaOpenAI = datosMeteorologicos?.respuesta_openAI || 'No disponible';

    // Se nicializan los estados con los datos iniciales
    //const [currentSunrise, setCurrentSunrise] = useState(initialCurrentSunrise);
    //const [currentMoonPhase, setCurrentMoonPhase] = useState(initialMoonPhase);
    //const [respuestaOpenAI, setRespuestaOpenAI] = useState(initialRespuestaOpenAI);

    const containerRef = useRef(null);
    const contentRef = useRef(null);

    // Llamada a datos e impresiones para depuración en la consola
    /*const temperaturaActual = datosMeteorologicos?.respuesta_openAI;
    console.log("Temp. actual", temperaturaActual);
    console.log("Datos meteorológicos", datosMeteorologicos);
    console.log("Initial current Weather", initialCurrentWeather);
    console.log("Initial daily Forecast", initialDailyForecast);
    console.log("Temp-max-antes:",dailyForecast.apparent_temperature_max);
    console.log("Initial AI",initialRespuestaOpenAI);*/

    // Se actualizan los estados cuando cambian los datos
    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (container & content) {

            const scrollSpeed = 30; // Ajusta la velocidad de desplazamiento según tus preferencias
            const contentWidth = content.clientWidth;
            const containerWidth = container.clientWidth;

            //Funcion que desplaza el texto en la ventana principal
            function scrollText() {
                if (contentWidth > containerWidth) {
                    content.style.transform = `translateX(${containerWidth}px)`; // Inicializa la posición del texto
                    const animationDuration = (contentWidth / scrollSpeed) * 1000;

                    content.style.transition = `transform ${animationDuration}ms linear`;
                    content.style.transform = `translateX(-${contentWidth}px)`; // Desplaza el texto
                }
            }

            scrollText();

            // Reinicia el desplazamiento cuando termine la animación
            content.addEventListener('transitionend', () => {
                content.style.transition = 'none';
                content.style.transform = `translateX(${containerWidth}px)`;
                setTimeout(scrollText, 500); // Pausa antes de reiniciar
            });
        }


        // Actualizamos los estados con los datos de datosMeteorologicos
        //setCurrentSunrise(sunriseData.sunriseData?.daily || {});
        //setCurrentMoonPhase(moonData?.moonData.data || {});
        //setRespuestaOpenAI(datosMeteorologicos?.respuesta_openAI || 'No disponible');

        // Actualizamos los estados con los datos de sunriseData
        setCurrentSunriseData(sunriseData || {});
    }, [sunriseData]); // Ahora escuchamos cambios solo en sunriseData


    /*
         //Función para manejar cambios en sunrise/sunset
        const handleCurrentWeatherChange = (key, newValue) => {
            console.log(`Cambio en ${key}: ${newValue}`);
            setCurrentWeather((prevWeather) => ({
                ...currentWeather,
                [key]: newValue,
            }));
        };
    
        // Función para manejar cambios en el pronóstico diario
        const handleDailyForecastChange = (key, newValue) => {
            setDailyForecast((prevWeather) => ({
                ...dailyForecast,
                [key]: newValue,
            }));
        };
    */

    // Se renderiza el componente que muestra las respuestas, WeatherDisplay
    return (
        <ChakraProvider>
            <Box p={4} backgroundColor={'#52525B'} borderRadius="10px" textAlign={'center'}>
                <Heading as="h2" size="lg" mb={4} color={'#D4D4D8'}>
                    Horarios de inicio de amanecer y puesta de sol
                </Heading>
                <Flex p={4}
                    maxW={'100%'}
                    flexDirection={'row'}
                    justifyContent={"space-around"}
                    //flexDirection={useBreakpointValue({ base: "column", md: "row", lg: "row" })}
                    alignContent={['center', 'center', 'space-baround']}  //flexDirection responsive especifica segun el tamaño de la pantalla
                    alignItems={['center', 'center', 'stretch']}
                    backgroundColor={'#D4D4D8'}
                    borderRadius="10px"
                    flexWrap={'wrap'}>
                    <Box>
                        <Heading as="h3" size="md" mb={2} color={'#262626'} textAlign={'center'}>
                            Amanecer
                        </Heading>
                        <InfoWindow
                            label="Amanecer"
                            value={sunriseData.sunriseTime || ''}
                            onChange={(value) => setCurrentSunriseData((prevData) => ({ ...prevData, sunriseTime: value }))}
                            customClassName='scroll-fast' // Se asigna una clase CSS específica para controlar la velocidad de desplazamiento
                        />
                        <Text>Horario: {sunriseData.sunriseTime ? sunriseData.sunriseTime : ''}</Text>
                        {/* Agrega más detalles según sea necesario */}
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={2} color={'#262626'} textAlign={'center'}>
                            Anochecer
                        </Heading>
                        <InfoWindow
                            label="Anochecer"
                            value={sunriseData.sunsetTime || ''}
                            onChange={(value) => setCurrentSunriseData((prevData) => ({ ...prevData, sunsetTime: value }))}
                            customClassName='scroll-fast' // Se asigna una clase CSS específica para controlar la velocidad de desplazamiento
                        />
                        <Text>Horario: {sunriseData && sunriseData.sunsetTime ? sunriseData.sunsetTime : ''}</Text>
                        {/* Agrega más detalles según sea necesario */}
                    </Box>
                </Flex >

                <Heading as="h2" size="lg" mb={4} mt={4} color={'#D4D4D8'} textAlign={'center'}>
                    Datos de Fase Lunar
                </Heading>
                <Flex p={4}
                    maxW={'100%'}
                    flexDirection={'row'}
                    justifyContent={"space-around"}
                    //flexDirection={useBreakpointValue({ base: "column", md: "row", lg: "row" })}
                    alignContent={['center', 'center', 'space-baround']}  //flexDirection responsive especifica segun el tamaño de la pantalla
                    alignItems={['center', 'center', 'stretch']}
                    backgroundColor={'#D4D4D8'}
                    borderRadius="10px"
                    flexWrap={'wrap'}>
                    <Box>
                        <Heading as="h3" size="md" mb={2} textAlign={'center'}>
                            Fase Lunar Actual
                        </Heading>
                        <InfoWindow
                            label="Fase lunar"
                            value={sunriseData.moonPhase || ''}
                            onChange={(value) => setCurrentSunriseData((prevData) => ({ ...prevData, moonPhase: value }))}
                            customClassName='scroll-fast' // Se asigna una clase CSS específica para controlar la velocidad de desplazamiento
                        />
                        <Text>Fase: {sunriseData.nextFullMoon && sunriseData.moonPhase ? sunriseData.moonPhase : ''}</Text>
                        {/* Agrega más detalles según sea necesario */}
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={2} textAlign={'center'}>
                            Próxima Luna Llena
                        </Heading>
                        <InfoWindow
                            label="Próxima Luna Llena"
                            value={sunriseData.nextFullMoon?.datetime || ''}
                            onChange={(value) => setCurrentSunriseData((prevData) => ({ ...prevData, nextFullMoon: { ...prevData.nextFullMoon, datetime: value } }))}
                            customClassName='scroll-fast' // Se asigna una clase CSS específica para controlar la velocidad de desplazamiento
                        />
                        <Text>Fecha: {sunriseData.nextFullMoon && sunriseData.nextFullMoon.datetime ? sunriseData.nextFullMoon.datetime : ''}</Text>
                        {/* Agrega más detalles según sea necesario */}
                    </Box>

                </Flex>
            </Box>


            {/* Agrega más secciones según sea necesario */}



            {/* Puedes seguir renderizando más contenido aquí */}
        </ChakraProvider>
    );
}

export default SunriseDisplay;