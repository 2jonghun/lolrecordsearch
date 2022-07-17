'use strict';

const superagent = require('superagent');

const apiKey = 'RGAPI-746071d8-4957-48ea-a177-4dee9cb574c0';
const BASE_URL = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

class RiotApi {
  static getIdInfo(reqServer, reqId) {
      const requestUrl = `https://${reqServer}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${reqId}`
      return superagent
        .get(requestUrl)
        .set('X-Riot-Token', apiKey)
        .then(res => {
          if (res.statusCode == 200) {
            return { success:true, data:res.body };
          } else {
            return { success:false, data:res.statusCode };
          }
        })
       .catch(err => {
            return { success:false, data:err };
        });
    };
}

module.exports = RiotApi;