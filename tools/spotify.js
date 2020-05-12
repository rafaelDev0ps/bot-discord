var request = require('request');

const spotifyAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;

const setTrackOnQueueBy = function(trackId, deviceId) {
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


exports.setTrackOnQueueBy = setTrackOnQueueBy;
