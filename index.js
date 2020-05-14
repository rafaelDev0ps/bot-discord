const discord = require("discord.js");
const spotifyClient = require('./features/spotify.js');
const cseClient = require('./features/cse.js');

const google = new cseClient.GoogleCSE();
const spotify = new spotifyClient.Spotify();
const discordClient = new discord.Client();

discordClient.once('ready', () => {
	console.log('Ready!');
});

discordClient.on('message', message => {
  let mensagem = message.content;

  if (mensagem.charAt(0) === "!") {

    if (message.content === '!ping') {
      message.channel.send('pong!');
    }

    let arrayMensagem = mensagem.split(" ");

    if (arrayMensagem[0] === '!meme') {

      google.getImage(mensagem).then(images => { 
        
        message.channel.send({
          files: [images[0].url]
        });
        
      }).catch(error => {
        console.log(error);
      });
    }

    if (arrayMensagem[0] === '!spotify' && arrayMensagem[1] === 'find') {

      spotify.getSpotifyTrack(arrayMensagem).then((response) => {

        message.channel.send(response.data.tracks.items[0].album.artists[0].external_urls.spotify);
        
      }).catch((err) => {
        console.log(err);
      });
    }

    if (arrayMensagem[0] === '!spotify' && arrayMensagem[1] === 'queue') {
      spotify.getComputerDeviceId().then((res) => {
        const deviceId = res.data.devices[0].id;
        let trackId = arrayMensagem[2];

        spotify.setTrackOnQueueBy(trackId, deviceId);

      }).catch((err) => {
        console.log(err);
        message.channel.send("Unable to set your track on queue!");
      });
      message.channel.send("Your track is on queue!");
    }
  }    
});

const token = process.env.DISCORD_TOKEN;

discordClient.login(token);