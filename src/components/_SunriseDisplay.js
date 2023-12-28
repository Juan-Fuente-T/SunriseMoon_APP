import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading, Divider, Flex, ChakraProvider, Text, useBreakpointValue, extendTheme } from '@chakra-ui/react';
import InfoWindow from './InfoWindow';
import { sunrise } from './ConsultarSunrise';


// Define el componente WeatherDisplay
function SunriseDisplay({ moonPhase, nextFullMoon, sunriseTime, sunsetTime }) {
    // Se extraen los datos iniciales de sunriseData y moonData
    /*const initialSunrise = sunriseData?.daily || {};
    const initialClosestPhase = closestPhase || {};
    const initialNextFullMoon = nextFullMoon || {};
    const initialNextNewMoon = nextNewMoon || {};*/
    //const initialRespuestaOpenAI = datosMeteorologicos?.respuesta_openAI || 'No disponible';

    // Se inicializan los estados con los datos iniciales
    const [currentSunriseTime, setCurrentSunriseTime] = useState(sunriseTime || '');
    const [currentSunsetTime, setCurrentSunsetTime] = useState(sunsetTime || '');
    const [currentMoonPhase, setCurrentMoonPhase] = useState(moonPhase || '');
    const [currentNextFullMoon, setCurrentNextFullMoon] = useState(nextFullMoon || '');

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


        // Actualizamos los estados con los datos 
        setCurrentSunriseTime(sunriseTime || {});
        setCurrentSunsetTime(sunsetTime || {});
        setCurrentMoonPhase(moonPhase || {});
        setCurrentNextFullMoon(nextFullMoon || {});
        //setRespuestaOpenAI(datosMeteorologicos?.respuesta_openAI || 'No disponible');
        console.log("DatosSunrise:", moonPhase, nextFullMoon, sunsetTime, sunsetTime);
    }, [moonPhase, nextFullMoon, sunriseTime, sunsetTime]);// Esto escucha cambios en los datos iniciales

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
    return (
        <div>
            {/* Renderiza los datos en tu componente */}
            <div>
                <Heading as="h2" size="lg" mb={4}>
                    Datos de Amanecer y Fase Lunar
                </Heading>
                <Flex justifyContent="space-between">
                    <Box>
                        <Heading as="h3" size="md" mb={2}>
                            Amanecer
                        </Heading>
                        <Text>Horario: {currentSunriseTime || ''}</Text>
                        {/* Agrega más detalles según sea necesario */}
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={2}>
                            Anochecer
                        </Heading>
                        <Text>Horario: {sunsetTime || ''}</Text>
                        {/* Agrega más detalles según sea necesario */}
                    </Box>

                    <Box>
                        <Heading as="h3" size="md" mb={2}>
                            Fase Lunar Actual
                        </Heading>
                        <Text>Fase: {moonPhase || ''}</Text>
                        {/* Agrega más detalles según sea necesario */}
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={2}>
                            Próxima Luna Llena
                        </Heading>
                        <Text>Fecha: {nextFullMoon || ''}</Text>
                        {/* Agrega más detalles según sea necesario */}
                    </Box>

                </Flex>
            </div>

            {/* Agrega más secciones según sea necesario */}

            {/* Componente de ventana de información */}
            <InfoWindow />

            {/* Puedes seguir renderizando más contenido aquí */}
        </div>
    );
}

export default SunriseDisplay;