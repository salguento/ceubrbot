// IMPORTAÇÃO
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// GERAÇÃO DE DATA ALEATÓRIA
function randomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const str = date.toISOString().slice(0, 10);
  return str;
}

const date = randomDate(new Date(2020, 3, 23), new Date());

// FORMATAÇÃO DE DATA
const monthNames = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const dateObj = new Date(date);
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2, "0");
const year = dateObj.getFullYear();
const output = day + "/" + month + "/" + year;

// CONFIGURAÇÃO DA API
const covidAPI = `https://covid-193.p.rapidapi.com/history?country=brazil&day=${date}`;


const API_Login = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-193.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
  },
};

// SOLITAÇÃO PARA API
async function getStars(err) {
  let response = await fetch(covidAPI, API_Login);
  let json = await response.json();
  let data = await json.response[0].deaths.new.replace("+", "");
  if (err) {
    getStars();
  } else if (!err) {
    return [data, output];
  }
}

// EXPORTAÇÃO DE FUNÇÃO
export default getStars;
