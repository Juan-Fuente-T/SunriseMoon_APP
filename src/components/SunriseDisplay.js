import React, { useState, useEffect, useMemo } from 'react';
import { Box, Heading, Flex, ChakraProvider } from '@chakra-ui/react';
import InfoWindow from './InfoWindow';
import { scrollableText } from '../styles';
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


// Se define la velocidad de desplazamiento
const scrollSpeed = 30;

// Se define el ancho de contenido y contenedor (ajusta según sea necesario)
const contentWidth = 500;
const containerWidth = 300;


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

        const content = document.getElementById('scrollContainer');

        // Función para el desplazamiento
        const scrollText = () => {
            if (content) {
                content.style.transform = `translateX(${containerWidth}px)`;
                const animationDuration = (contentWidth / scrollSpeed) * 1000;

                content.style.transition = `transform ${animationDuration}ms linear`;
                content.style.transform = `translateX(-${contentWidth}px)`;
            }
        };

        // Llamada a la función de desplazamiento al renderizar el componente
        scrollText();

        // Reinicia el desplazamiento cuando termine la animación
        content?.addEventListener('transitionend', () => {
            content.style.transition = 'none';
            content.style.transform = `translateX(${containerWidth}px)`;
            setTimeout(scrollText, 500);
        });

    }, [initialmoonData]);




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
                    flexDirection={['column', 'row']}
                    //flexDirection={useBreakpointValue({ base: "column", md: "row", lg: "row" })}
                    justifyContent={'center'}
                    alignItems={'center'}
                    alignContent={'center'}
                    backgroundColor={'#D4D4D8'}
                    borderRadius="10px"
                >
                    <Box maxWidth={'100%'} alignItems={'center'}>
                        <img src={displayedImage} alt="Icono de fase lunar" style={{ width: '250px', borderRadius: '10px', margin: '0', justifyContent: 'center', alignContent: 'center' }} />
                    </Box>
                    <Flex ml={'2'} flexDirection={'column'} alignContent={'center'} align={'center'} alignItems={'center'} justifyContent={'center'} >
                        <Box>
                            <Heading as="h3" size="md" mb={2} mt={2} textAlign={'center'}>
                                Fase Lunar Actual
                            </Heading>
                            <InfoWindow
                                className={scrollableText}
                                label="Fase lunar"
                                value={currentmoonData.moonPhase || ''}
                                onChange={(value) => setCurrentmoonData((prevData) => ({ ...prevData, moonPhase: value }))}
                            />
                        </Box>
                        <Box>
                            <Heading as="h3" size="md" mb={2} textAlign={'center'}>
                                Próxima Luna Llena
                            </Heading>
                            <InfoWindow
                                className={scrollableText}
                                label="Próxima Luna Llena"
                                value={currentmoonData?.nextFullMoon || ''}
                                onChange={(value) => setCurrentmoonData((prevData) => ({ ...prevData, nextFullMoon: { ...prevData.nextFullMoon, datetime: value } }))}
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Box>


            {/* Agrega más secciones según sea necesario */}



            {/* Puedes seguir renderizando más contenido aquí */}
        </ChakraProvider >
    );
}

export default SunriseDisplay;