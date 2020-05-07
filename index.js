const discord = require("discord.js");
// const axios = require('axios')
const imageSearch = require('image-search-google');
 

const keyAPI = process.env.KEY_API;
const context = process.env.CONTEXT_KEY;

const clientCSE = new imageSearch(context, keyAPI);
const options = {
  page:1,
  size: 'large'
};

const discordClient = new discord.Client();

discordClient.once('ready', () => {
	console.log('Ready!');
});

discordClient.on('message', message => {

	if (message.content === 'ping') {
		message.channel.send('pong!');
  }

  let mensagem = message.content;
  let arrayMensagem = mensagem.split(" ");

  if (arrayMensagem[0] === 'meme') {

    clientCSE.search(mensagem, options).then(images => { 
      message.channel.send(images[0].thumbnail)
      
    }).catch(error => {
      console.log(error);
    });
  }
    
});

const token = process.env.DISCORD_TOKEN;

discordClient.login(token);