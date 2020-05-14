const imageSearch = require('image-search-google');


const keyAPI = process.env.KEY_API;
const context = process.env.CONTEXT_KEY;

const clientCSE = new imageSearch(context, keyAPI);
const options = {
  page:1,
  size: 'large'
};

class GoogleCSE {

  getImage(mensagem) {
    return clientCSE.search(mensagem, options)
  }

}

exports.GoogleCSE = GoogleCSE