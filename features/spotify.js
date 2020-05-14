var request = require('request');
const axios = require("axios");

const spotifyAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;


class Spotify {
  setTrackOnQueueBy(trackId, deviceId) {
    let trackIdEncoded = trackId.replace(':', '%3A');
    const options = {
      'method': 'POST',
      'url': `https://api.spotify.com/v1/me/player/queue?uri=${trackIdEncoded}&device_id=${deviceId}`,
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${spotifyAccessToken}`
      }
    };
    request(options, function (error, response) { 
      if (error) throw new Error(error);
      return response
    });
  }

  async getSpotifyTrack(arrayMensagem) {
    let queryArray = arrayMensagem.splice(2, arrayMensagem.length - 1);
    let trackName = queryArray.join(' ');
    
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

  async getComputerDeviceId() {
    try {
      return await axios.get(`https://api.spotify.com/v1/me/player/devices`,
        {headers: {"Authorization": `Bearer ${spotifyAccessToken}`}}
      );
    } catch (err) {
      console.log(err);
    }
  }

}


exports.Spotify = Spotify;
