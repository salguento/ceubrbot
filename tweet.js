// IMPORTAÇÃO
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

// CONFIGURAÇÃO DE TWITTER
const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// TUITAR
async function tweet(stars) {
  try {
    var media = "./output/output.gif";
    console.log("Tuitando...");
    const mediaId = await client.v1.uploadMedia(media);
    const newTweet = await client.v1.tweet(
      stars[0] + " vítimas em " + stars[1] + ". Descansem em paz.",
      {
        media_ids: mediaId,
      }
    );
    console.log("Tuitado!");
  } catch (error) {
    process.exit(1);
  }
}

// EXPORTAÇÃO DE FUNÇÃO
export default tweet;