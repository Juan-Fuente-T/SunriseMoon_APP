const { sunrise } = require('./ConsultarSunrise.js');
const myApiKey = process.env.REACT_APP_API_KEY;
console.log("APIKEY", myApiKey);
async function run() {
    try {
        const result = await sunrise('Barcelona'); // Reemplaza 'Barcelona' con la ubicación o código postal que desees consultar
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

run();