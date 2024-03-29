const fs = require('fs');
const util = require('util');

module.exports = {
  get(secret){
    try{
      return fs.readFileSync(util.format('/run/secrets/%s', secret), 'utf8').trim();//trim required to remove trailing \n
     }
     catch(e){
       return false;
     }
  }
};
