'use strict';

const superagent = require('superagent');

const apiKey = 'RGAPI-0d07efcf-310e-408b-99fe-899d000123d4';

class RiotApi {
  static getIdInfo(reqServer, reqId) {
    const idInfoUrl = `https://${reqServer}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${reqId}`
    return superagent
      .get(idInfoUrl)
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
    const matchIdUrl = `https://${reqContinent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${reqPuuid}/ids?start=0&count=10`
    return superagent
      .get(matchIdUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          return { success:true, data:res.body };
        } else {
          return { success:false };
        }
      })
      .catch(err => {
        return { success:false, msg:err };
      });
  }

  static async getMatchInfo(reqContinent, reqPuuid) {
    const matchIds = await this.getMatchId(reqContinent, reqPuuid);
    if (matchIds.success != true) {
      return { success:false }
    }
    const matchInfos = {};
    for (let i=0; i<matchIds.data.length; i++){
      const matchId = matchIds.data[i];
      const matchInfoUrl = `https://${reqContinent}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
      matchInfos[i] = await superagent.get(matchInfoUrl).set('X-Riot-Token', apiKey)
        .then(res => {
          if (res.statusCode == 200) {
            return { success:true, data:res.body };
          } else {
            return { sucess:false };
          }
        })
        .catch(err => {
          return { success:false, msg:err };
        });
    }
    return matchInfos;
  }

}

module.exports = RiotApi;