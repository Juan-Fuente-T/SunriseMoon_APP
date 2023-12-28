import React, { useState, useEffect, useMemo } from 'react';
import { Box, Heading, Flex, ChakraProvider } from '@chakra-ui/react';
import InfoWindow from './InfoWindow';
import defaultImage from '../moonImages/default-image.png';
import errorImage from '../moonImages/error-image.png';
import moonImage0 from '../moonImages/moonImage0.png';
import moonImage01 from '../moonImages/moonImage01.png';
import moonImage02 from '../moonImages/moonImage02.png';
import moonImage03 from '../moonImages/moonImage03.png';
import moonImage04 from '../moonImages/moonImage04.png';
import moonImage05 from '../moonImages/moonImage05.png';
import moonImage06 from '../moonImages/moonImage06.png';
import moonImage07 from '../moonImages/moonImage07.png';


function SunriseDisplay({ sunriseMoonData }) {
    // Se extraen los datos iniciales de moonData
    const initialmoonData = useMemo(() => sunriseMoonData?.moonData || {}, [sunriseMoonData]);

    const moonImageName = sunriseMoonData?.moonImage || defaultImage;

    let displayedImage;

    if (typeof sunriseMoonData?.moonData?.hasError !== "undefined") {
        const hasError = sunriseMoonData?.moonData.hasError;
        console.log("ErrorDISPLAY:", sunriseMoonData.moonData.hasError);
        displayedImage = errorImage;
    } else {
        switch (moonImageName) {
            case 'moonImage0':
                displayedImage = moonImage0;
                break;
            case 'moonImage01':
                displayedImage = moonImage01;
                break;
            case 'moonImage02':
                displayedImage = moonImage02;
                break;
            case 'moonImage03':
                displayedImage = moonImage03;
                break;
            case 'moonImage04':
                displayedImage = moonImage04;
                break;
            case 'moonImage05':
                displayedImage = moonImage05;
                break;
            case 'moonImage06':
                displayedImage = moonImage06;
                break;
            case 'moonImage07':
                displayedImage = moonImage07;
                break;
            default:
                displayedImage = defaultImage;
        }

    }


    // Se inicializan los estados con los datos iniciales
    const [currentmoonData, setCurrentmoonData] = useState(initialmoonData);

    // Efecto para actualizar el estado cuando cambian los datos
    useEffect(() => {
        setCurrentmoonData(initialmoonData);
    }, [initialmoonData]);


    // Define el componente WeatherDisplay
    /*function SunriseDisplay({ sunriseMoonData }) {
        console.log("SunriseDisplay recibió los siguientes datos:", sunriseMoonData);
    
        // Se extraen los datos iniciales de moonData
        const initialmoonData = sunriseMoonData?.moonData || {};
        const moonImage = sunriseMoonData?.moonImage || 'defaultImage';
    
    
        //console.log("sunriseMoonData", sunriseMoonData);
        //console.log("sunriseMoonData.moonData", sunriseMoonData.moonData);
        //console.log("sunriseMoonData.moonData.nextFullMoon", sunriseMoonData.moonData.nextFullMoon);
    
    
        //const moonImage = sunriseMoonData?.moonImage || 'defaultImage';
        console.log("SUNRISEDisplayMoonImage", moonImage);
    
        // Verificar si moonData está definido antes de intentar acceder a sus propiedades
        const moonDataAvailable = Object.keys(initialmoonData).length > 0;
    
        // Se inicializan los estados con los datos iniciales
        const [currentmoonData, setCurrentmoonData] = useState(initialmoonData);
    
    
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
    /*useEffect(() => {
        if (sunriseMoonData && sunriseMoonData.moonData) {
            const currentmoonData = sunriseMoonData.moonData || {};
    
            console.log("Current Sunrise Data:", currentmoonData);
    
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
            //setCurrentSunrise(moonData.moonData?.daily || {});
            //setCurrentMoonPhase(moonData?.moonData.data || {});
            //setRespuestaOpenAI(datosMeteorologicos?.respuesta_openAI || 'No disponible');
    
            // Actualizamos los estados con los datos de moonData
            setCurrentmoonData(currentmoonData);
        } else {
            // Si sunriseMoonData o sunriseMoonData.moonData es undefined, podemos manejarlo aquí
            console.error('Datos de amanecer no disponibles');
        }
    }, [sunriseMoonData]); // Ahora escuchamos cambios solo en moonData*/


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

    // Se renderiza el componente que muestra las respuestas, SunriseDisplay
    return (
        <ChakraProvider>
            <Box p={4} backgroundColor={'#52525B'} borderRadius="10px" textAlign={'center'}>
                <Heading as="h2" size="lg" mb={4} color={'#D4D4D8'}>
                    Horarios de inicio de amanecer y puesta de sol
                </Heading>
                <Flex
                    maxW={'100%'}
                    flexDirection={'row'}
                    justifyContent={'space-around'}
                    //flexDirection={useBreakpointValue({ base: "column", md: "row", lg: "row" })}
                    // alignContent={['center', 'center', 'space-around']}  //flexDirection responsive especifica segun el tamaño de la pantalla
                    //alignItems={['center', 'center', 'center']}
                    m={'1'}
                    p={'1'}
                    backgroundColor={'#D4D4D8'}
                    borderRadius="10px"
                    flexWrap={'non-wrap'}>
                    <Box>
                        <Heading as="h3" size="md" mb={1} color={'#262626'} textAlign={'center'} >
                            Amanecer
                        </Heading>
                        <InfoWindow
                            label="Amanecer"
                            value={sunriseMoonData?.sunriseTime || ''}
                            onChange={(value) => setCurrentmoonData((prevData) => ({ ...prevData, sunriseTime: value }))}
                            customClassName='scroll-fast' // Se asigna una clase CSS específica para controlar la velocidad de desplazamiento
                        />
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={1} color={'#262626'} textAlign={'center'}>
                            Anochecer
                        </Heading>
                        <InfoWindow
                            label="Anochecer"
                            value={sunriseMoonData?.sunsetTime || ''}
                            onChange={(value) => setCurrentmoonData((prevData) => ({ ...prevData, sunsetTime: value }))}
                            customClassName='scroll-fast' // Se asigna una clase CSS específica para controlar la velocidad de desplazamiento
                        />
                    </Box>
                </Flex >

                <Heading as="h2" size="lg" mb={1} mt={1} color={'#D4D4D8'} textAlign={'center'}>
                    Datos de Fase Lunar
                </Heading>
                <Flex p={4}
                    maxW={'100%'}
                    flexDirection={'row'}
                    //flexDirection={useBreakpointValue({ base: "column", md: "row", lg: "row" })}
                    justifyContent={'space-around'}
                    backgroundColor={'#D4D4D8'}
                    borderRadius="10px"
                >
                    <Box maxWidth={'100%'} alignItems={'center'}>
                        <img src={displayedImage} alt="Icono de fase lunar" style={{ width: '250px', borderRadius: '10px', margin: '0', justifyContent: 'center', alignContent: 'center' }} />
                    </Box>
                    <Flex ml={'2'} flexDirection={'column'} alignContent={'flex-end'} justifyContent={'center'} >
                        <Box>
                            <Heading as="h3" size="md" mb={2} textAlign={'center'}>
                                Fase Lunar Actual
                            </Heading>
                            <InfoWindow
                                label="Fase lunar"
                                value={currentmoonData.moonPhase || ''}
                                onChange={(value) => setCurrentmoonData((prevData) => ({ ...prevData, moonPhase: value }))}
                                customClassName='scroll-fast' // Se asigna una clase CSS específica para controlar la velocidad de desplazamiento
                            />
                        </Box>
                        <Box>
                            <Heading as="h3" size="md" mb={2} textAlign={'center'}>
                                Próxima Luna Llena
                            </Heading>
                            <InfoWindow
                                label="Próxima Luna Llena"
                                value={currentmoonData?.nextFullMoon || ''}
                                onChange={(value) => setCurrentmoonData((prevData) => ({ ...prevData, nextFullMoon: { ...prevData.nextFullMoon, datetime: value } }))}
                                customClassName='scroll-fast' // Se asigna una clase CSS específica para controlar la velocidad de desplazamiento
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Box>


            {/* Agrega más secciones según sea necesario */}



            {/* Puedes seguir renderizando más contenido aquí */}
        </ChakraProvider>
    );
}

export default SunriseDisplay;