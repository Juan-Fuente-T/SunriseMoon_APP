//const axios = require('axios');
import axios from 'axios';
var SunCalc = require('suncalc');



function obtainMoonPhase(_moonPhase) {

    // Ajusta el rango según lo especificado
    if (_moonPhase > 0 && _moonPhase < 0.5) {
        return "Creciente";
    } else if (_moonPhase > 0.5 && _moonPhase <= 1) {
        return "Menguante";
    } else if (_moonPhase === 0.5) {
        return "Luna Llena";
    } else if (_moonPhase === 0) {
        return "Luna Nueva";
    } else {
        return "Fase Desconocida";
    }
}


function obtainMoonImage(_moonPhase) {
    let moonImage;

    if (_moonPhase === 0) {
        moonImage = 'moonImage0';
    } else if (_moonPhase > 0 && _moonPhase < 0.25) {
        moonImage = 'moonImage01'; //return moonImage;
    } else if (_moonPhase === 0.25) {
        moonImage = 'moonImage02';
    } else if (_moonPhase > 0.25 && _moonPhase < 0.5) {
        moonImage = 'moonImage03';
    } else if (_moonPhase === 0.5) {
        moonImage = 'moonImage04';
    } else if (_moonPhase > 0.5 && _moonPhase < 0.75) {
        moonImage = 'moonImage05';
    } else if (_moonPhase === 0.75) {
        moonImage = 'moonImage06';
    } else if (_moonPhase > 0.75 && _moonPhase < 1) {
        moonImage = 'moonImage07';
    } else {
        // Si la fase lunar no coincide con las anteriores, asignar una imagen predeterminada o dejarla en blanco
        moonImage = ''; // asigna una imagen predeterminada
    }
    return moonImage;
}




//FALLA LA API
/*async function getNextFullMoon(location) {
    try {
        const { latitude, longitude } = await geocodeLocation(location);
        //console.log("Lat, Lon:", latitude, longitude);

        // Usa la API de Moon-API.com
        const apiUrl = `https://moon-api.p.rapidapi.com/phases?lat=${latitude}&lon=${longitude}&year=${new Date().getFullYear()}`;
        const response = await axios.get(apiUrl, {
            headers: {
                'X-RapidAPI-Key': '199de2af72msh2d5249331b0cc92p169006jsnd5b15cd27aed',
                'X-RapidAPI-Host': 'moon-api.p.rapidapi.com'
            }
        });

        console.log("ResponseGetNEXT:", response);

        // Filtra las fechas donde la fase de la luna es 1 (luna llena)
        const fullMoons = response.data.phases.filter(moonPhase => moonPhase.phase === 1);

        if (!fullMoons.length) {
            throw new Error('No se encontró ninguna luna llena en los próximos 60 días');
        }

        // Ordena las luces llenas y selecciona la próxima
        const nextFullMoon = fullMoons.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
        console.log("NextFullMoon: ", nextFullMoon);
        return nextFullMoon;
    } catch (error) {
        console.error(`Ocurrió un error al obtener la próxima luna llena: ${error.message}`);
        throw error;
    }
}*/


// Función para obtener la fase lunar y la próxima luna llena por fecha

/*async function theMoonPhase(location) {
    try {

        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${process.env.REACT_APP_SUNRISE_API_KEY}&contentType=json`;

        //const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/geocode/Denver?unitGroup=us&key=${process.env.REACT_APP_SUNRISE_API_KEY}&contentType=json`;

        const response = await axios.get(apiUrl);
        //console.log("Response:", response);
        // Acceder a la fase lunar
        const _moonPhase = response.data.currentConditions.moonphase;

        // Verificar si las propiedades son nulas o indefinidas antes de usarlas

        const moonPhase = obtainMoonPhase(_moonPhase);

        // Acceder a la hora de amanecer y anochecer
        const sunriseTime = response.data.currentConditions.sunrise;
        const sunsetTime = response.data.currentConditions.sunset;

        // Acceder a la fecha de la próxima luna llena
        //const days = response.data.days;
        //const nextFullMoon = days.find(day => day.moonphase === 0.5);//no funciona

        const nextFullMoon = theNextFullMoon();
        return { moonPhase, nextFullMoon, sunriseTime, sunsetTime, _moonPhase };
    } catch (error) {
        console.error(`Ocurrió un error al obtener las fases lunares: ${error.message}`);
        return { hasError: true, errorMessage: `Ocurrió un error al obtener las fases lunares: ${error.message}` };
    }
}*/



// Función que verifica si la ubicación introducida es válida (solo letras y espacios)
function isLocation(inputValue) {
    const locationPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/;
    //console.log("Funcion isLocation", locationPattern.test(inputValue));
    return locationPattern.test(inputValue);
}

// Función que verifica si el código postal introducido es un formato válido (5 dígitos numéricos)
function isPostalCode(inputValue) {
    const postalCodePattern = /^\d{5}$/;
    return postalCodePattern.test(inputValue);
}

// Función que obtiene la latitud, longitud y zona horaria a partir del código postal
async function geocodePostalCode(postalCode) {
    const geocodeApiUrl = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=Spain&format=json&limit=1`;

    try {
        const response = await axios.get(geocodeApiUrl);
        //console.log("DatosGeoPostalCode", response);
        const locationData = response.data[0];

        if (!locationData) {
            throw new Error(`No se pudo obtener la ubicación para el código postal ${postalCode}`);
        }

        const { display_name } = locationData;

        // Extracción de la primera parte del nombre de la localidad
        const cityName = display_name.split(',')[0].trim();
        //console.log("Nombre de la cityName", cityName);
        return { cityName };
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Función que obtiene la latitud, longitud y zona horaria a partir de la ubicación
async function geocodeLocation(location) {
    const geocodeApiUrl = `https://nominatim.openstreetmap.org/search?city=${location}&country=Spain&format=json&limit=1`;

    try {
        const response = await axios.get(geocodeApiUrl);
        //console.log("Response from Nominatim:", response);

        const locationData = response.data[0];
        //console.log("LocationData", locationData);

        if (!locationData) {
            console.error("No se pudo encontrar la ubicación.");
            return { latitude: null, longitude: null, timezone: null };
        }

        const lat = locationData?.lat;
        const lon = locationData?.lon;
        const timezone = await getTimezone(lat, lon);

        return { latitude: lat, longitude: lon, timezone };
    } catch (error) {
        console.error(`Ocurrió un error al buscar la ubicación: ${error.message}`);
        return { latitude: null, longitude: null, timezone: null };
    }
}
// Función que obtiene el timezone a partir de la latitud y longitud

async function getTimezone(latitude, longitude) {
    const myApiKey = process.env.REACT_APP_API_KEY;
    console.log(myApiKey);
    const timezoneApiUrl = `https://api.ipgeolocation.io/timezone?apiKey=${myApiKey}&lat=${latitude}&lon=${longitude}`;

    try {
        const response = await axios.get(timezoneApiUrl);
        return response.data.timezone;
    } catch (error) {
        console.error(`No se pudo obtener el timezone: ${error.message}`);
        throw error;
    }
}

// Función que consulta la predicción meteorológica
async function getSunrise(latitude, longitude, timezone) {
    const openMeteoApiUrl = "https://api.open-meteo.com/v1/forecast";

    const params = {
        latitude,
        longitude,
        timezone,
        daily: "sunrise,sunset",
        forecast_days: 1
    };

    try {
        const response = await axios.get(openMeteoApiUrl, { params });
        const sunrise_Time = response.data.daily.sunrise[0];
        const sunset_Time = response.data.daily.sunset[0];

        const sunriseTime = sunrise_Time.split("T")[1];
        const sunsetTime = sunset_Time.split("T")[1];

        //return response.data;
        return { sunriseTime, sunsetTime };
    } catch (error) {
        console.error(`Error al obtener los horarios de amanecer y anochecer: ${error.message}`);
        throw error;
    }
}

function theNextFullMoon() {
    var now = new Date();

    // Calcular la fase lunar de hoy
    var todayMoonPhase = SunCalc.getMoonIllumination(now);

    // Verificar si hoy es una luna llena
    if ((todayMoonPhase.fraction >= 0.98 && todayMoonPhase.fraction <= 1)) {
        // Si hoy es una luna llena, buscar la próxima luna llena sumando un día a la fecha actual
        now.setDate(now.getDate() + 25);
    }

    // Calcular la próxima luna llena
    var fullMoon = SunCalc.getMoonIllumination(now);
    //console.log("Fraction", fullMoon.fraction)
    //console.log("Phase", fullMoon.phase)
    var _moonPhase = fullMoon.phase;

    while (!(fullMoon.fraction >= 0.99 && fullMoon.fraction <= 1)) {
        now.setDate(now.getDate() + 1);
        fullMoon = SunCalc.getMoonIllumination(now);
    }
    // Formatear la fecha en el formato deseado
    var nextFullMoon = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    //console.log("Next Full Moon: ", nextFullMoon);

    var moonPhase = obtainMoonPhase(_moonPhase);

    return { moonPhase, nextFullMoon, _moonPhase };
}

// Funcio que obtiene los datos de horario de amanecer, anochecer, fase lunar actual y proxima luna llena
async function sunrise(inputValue) {
    try {
        let location;

        if (isPostalCode(inputValue)) {
            const { cityName } = await geocodePostalCode(inputValue);
            location = cityName;
        } else if (isLocation(inputValue)) {
            location = inputValue;
        } else {
            throw new Error("Entrada no válida: debe ser un código postal o una ubicación");
        }

        const { latitude, longitude, timezone } = await geocodeLocation(location);
        const { sunriseTime, sunsetTime } = await getSunrise(latitude, longitude, timezone);

        const moonData = theNextFullMoon();
        //console.log("moonData", moonData);

        const moonImage = obtainMoonImage(moonData._moonPhase)
        //console.log("MoonImage", moonImage);
        //console.log("ErrorConsultar:", moonData.hasError);

        return { sunriseTime, sunsetTime, moonData, moonImage };

    } catch (error) {
        throw new Error(`Error al obtener datos: ${error.message}`);
    }
}

// Ejemplo de cómo usar geocodePostalCode
/*async function obtenerUbicacionDesdeCodigoPostal(postalCode) {
    try {
        const ubicacion = await geocodePostalCode(postalCode);
        console.log("Ubicación obtenida:", ubicacion);
        return ubicacion;
    } catch (error) {
        console.error("Error al obtener la ubicación:", error.message);
    }
}

// Llamada de ejemplo con un código postal
const codigoPostalEjemplo = '15003'; // Reemplaza con el código postal que desees
obtenerUbicacionDesdeCodigoPostal(codigoPostalEjemplo);*/

export { sunrise };
