console.log("Olá, o programa está rodando...");

// IMPORTAÇÃO DE FUNÇÃO
import tweet from "./tweet.js";
import getGif from "./sketch.js";
import getStars from "./getstars.js";

// FUNÇÃO PRINCIPAL
function run() {
  const gif = getStars().then((stars) => {
    getGif(stars);
    setTimeout(() => {
      tweet(stars);
      setTimeout(() => {
        process.exit(1);
      }, 1000 * 60 * 60 * 6);
    }, 1000 * 60 * 2);
  });
}

run();
