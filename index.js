const axios = require("axios");
const discord = require("discord.js");
const imageSearch = require('image-search-google');
const spotify = require('./tools/spotify');


const keyAPI = process.env.KEY_API;
const context = process.env.CONTEXT_KEY;
const spotifyAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;

const clientCSE = new imageSearch(context, keyAPI);
const options = {
  page:1,
  size: 'large'
};

const discordClient = new discord.Client();

discordClient.once('ready', () => {
	console.log('Ready!');
});


async function getSpotifyTrack(trackName) {
  try {
    return await axios.get(`https://api.spotify.com/v1/search`,
      {
        params: {q: trackName, type: 'track'},
        headers: {"Authorization": `Bearer ${spotifyAccessToken}`}
      }
    );
  } catch (err) {
    throw err;
  }
}

async function getComputerDeviceId() {
  try {
    return await axios.get(`https://api.spotify.com/v1/me/player/devices`,
      {headers: {"Authorization": `Bearer ${spotifyAccessToken}`}}
    );
  } catch (err) {
    console.log(err);
  }
}

discordClient.on('message', message => {

	if (message.content === 'ping') {
		message.channel.send('pong!');
  }

  let mensagem = message.content;
  let arrayMensagem = mensagem.split(" ");

  if (arrayMensagem[0] === 'meme') {

    clientCSE.search(mensagem, options).then(images => { 
      
      message.channel.send({
        files: [images[0].url]
      });
      
    }).catch(error => {
      console.log(error);
    });
  }


  if (arrayMensagem[0] === 'spotify' && arrayMensagem[1] === 'find') {

    let queryArray = arrayMensagem.splice(2, arrayMensagem.length - 1);
    let queryString = queryArray.join(' ');

    getSpotifyTrack(queryString).then((response) => {

      message.channel.send(response.data.tracks.items[0].album.artists[0].external_urls.spotify);
      
    }).catch((err) => {
      console.log(err);
    });
  }

  if (arrayMensagem[0] === 'spotify' && arrayMensagem[1] === 'queue') {
    getComputerDeviceId().then((res) => {
      const deviceId = res.data.devices[0].id;
      let trackId = arrayMensagem[2];

      spotify.setTrackOnQueueBy(trackId, deviceId);

    }).catch((err) => {
      console.log(err);
    });
    message.channel.send("aloha");
  }
    
});

const token = process.env.DISCORD_TOKEN;

discordClient.login(token);