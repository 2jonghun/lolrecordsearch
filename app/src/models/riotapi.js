'use strict';

const superagent = require('superagent');

const apiKey = 'RGAPI-abf6a767-c1c2-4ea0-ab5d-a8e2eb358961';
const middleUrl = 'api.riotgames.com'

class RiotApi {
  static getIdInfo(reqServer, reqId) {
    const idInfoUrl = `https://${reqServer}.${middleUrl}/lol/summoner/v4/summoners/by-name/${reqId}`
    return superagent
      .get(idInfoUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          return { success:true, encryptedId:res.body.id, profileIconId:res.body.profileIconId };
        } else {
          console.log('실패');
          return { success:false };
         }
       })
      .catch(err => {
        return { success:false, data:err };
      });
  }

  static async getLeagueId(reqServer, reqId) {
    const idInfo = await this.getIdInfo(reqServer, reqId);
    const encryptedId = idInfo.encryptedId;
    const profileIconId = idInfo.profileIconId;
    const leagueIdUrl = `https://${reqServer}.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}`
    return superagent
      .get(leagueIdUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res.body);
          return { success:true, data:res.body, profileIconId };
        } else {
          console.log(res);
          return { success:false };
        }
      })
      .catch(err => {
        return { success:false, msg:err };
      })
  }
}

module.exports = RiotApi;