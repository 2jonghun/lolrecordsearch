'use strict';

const superagent = require('superagent');

const apiKey = 'RGAPI-746071d8-4957-48ea-a177-4dee9cb574c0';

class RiotApi {
  static getIdInfo(reqServer, reqId) {
    const giiUrl = `https://${reqServer}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${reqId}`
    return superagent
      .get(giiUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          return { success:true, data:res.body };
        } else {
          return { success:false };
         }
       })
      .catch(err => {
        return { success:false, data:err };
      });
  }

  static getMatchId(reqContinent, reqPuuid) {
    const gmiUrl = `https://${reqContinent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${reqPuuid}/ids?start=0&count=10`
    return superagent
      .get(gmiUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          return { success:true, data:res.body}
        } else {
          return { success:false }
        }
      })
      .catch(err => {
        return { success:false, data:err };
      });
  }
}

module.exports = RiotApi;