'use strict';

const superagent = require('superagent');
const db = require('../config/db');
const route = require('../config/serverRoute');

const apiKey = process.env.RIOTAPIKEY;
const middleUrl = 'api.riotgames.com'

const profileIconUri = 'http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/';

class RiotApi {
  reqs = {
    reqServer: 'kr',
    reqUserName: '',
    puuid: '',
    serverRegion: 'asia',
  }

  changeProperty(reqs={}) {
    const keys = Object.keys(reqs);
    keys.forEach(req => {
      const preReq = this.reqs[req];
      const curReq = reqs[req];
      if (preReq != curReq) { 
        this.reqs[req] = reqs[req]
        if (req == 'reqServer') {
          this.reqs['serverRegion'] = route.serverRoute.getRegion(reqs[req])
        };
      };
    });
  }

  getChampRotations() {
    const champRotationsUrl = `https://${this.reqs['reqServer']}.api.riotgames.com/lol/platform/v3/champion-rotations`;

    return superagent
      .get(champRotationsUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) return res.body.freeChampionIds;
        else return undefined;
      })
  }

  getIdInfo() {
    const idInfoUrl = `https://${this.reqs['reqServer']}.${middleUrl}/lol/summoner/v4/summoners/by-name/${this.reqs['reqUserName']}`

    return superagent
      .get(idInfoUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res.body);
          const data = {
            encryptedId:res.body.id,
            profileIcon:`${profileIconUri}${res.body.profileIconId}.png`,
            puuid:res.body.puuid,
            name:res.body.name,
            level:res.body.summonerLevel,
          }
          return { success:true, data };
        } else {
          return { success:false };
         }
       })
      .catch(err => {
        return { success:false, msg:err };
      });
  }

  async #getIdInfo() {
    const idInfo = await this.getIdInfo();

    if (idInfo.success != true){
      return { success:false, msg:idInfo.msg };
    }

    return idInfo.data;
  }

  getMatchLists() {
    const matchLists = `https://${this.reqs['serverRegion']}.api.riotgames.com/lol/match/v5/matches/by-puuid/${this.reqs['puuid']}/ids?start=0&count=20`

    return superagent.get(matchLists).set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          return { success:true, data:res.body };
        } else {
          return { success:false };
        }
      })
      .catch(err => {
        return { success:false, msg:err };
      })
  }

  async getLeagueId() {
    const idInfo = await this.#getIdInfo();

    const profileIcon = idInfo.profileIcon;
    const summonerName = idInfo.name;
    const summonerLevel = idInfo.level;

    this.reqs['puuid'] = idInfo.puuid;
    this.reqs['encryptedId'] = idInfo.encryptedId;

    const leagueIdUri = `https://${this.reqs['reqServer']}.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.reqs['encryptedId']}`
    return superagent
      .get(leagueIdUri)
      .set('X-Riot-Token', apiKey)
      .then(async res => {
        if (res.statusCode == 200) {
          let matchList = await this.getMatchLists();
          if (matchList.success != true) matchList = undefined;

          const info = {
            profileIcon: profileIcon,
            summonerName: summonerName,
            summonerLevel: summonerLevel,
            reqServer: this.reqs['reqServer'],
            matchList: matchList.data,
          };

          if (res.body) {
            return { success:true, solo:res.body[0], free:res.body[1], info:info};
          } else {
            return { success:true, solo:null, free:null, info:info};
          }
        } else {
          return { success:false };
        }
      })
      .catch(err => {
        return { success:false, msg:err };
      })
  }

  getMatch(matchid) {
    const getMatchUrl = `https://${this.reqs['serverRegion']}.api.riotgames.com/lol/match/v5/matches/${matchid}`

    return superagent
      .get(getMatchUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {

          const participants = {
            // 
          }

          const matchData = {
            end_time:res.body.gameStartTimestamp,
            duration:res.body.duration,
            queueid:res.body.info.participants.queueid,
            participants:participants,
          }

          return { success:true, body:res.body};
        } else {
          return { success:false };
        }
      })
  }
}

module.exports = RiotApi;