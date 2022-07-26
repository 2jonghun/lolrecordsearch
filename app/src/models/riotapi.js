'use strict';

const superagent = require('superagent');
const db = require('../config/db');
const ValueParse = require('./routingValueServeParse');

const apiKey = process.env.RIOTAPIKEY;
const middleUrl = 'api.riotgames.com'

const profileIconUri = 'http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/';

class RiotApi {
  static getIdInfo(reqServer, reqId) {
    const idInfoUrl = `https://${reqServer}.${middleUrl}/lol/summoner/v4/summoners/by-name/${reqId}`

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

  static async #getIdInfo(reqServer, reqId) {
    const idInfo = await this.getIdInfo(reqServer, reqId);

    if (idInfo.success != true){
      return { success:false, msg:idInfo.msg };
    }

    return idInfo.data;
  }

  static getMatchLists(RVSP, puuid) {
    const matchLists = `https://${RVSP}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`

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

  static async #getMatchLists(RVSP, puuid) {
    const matchLists = await this.getMatchLists(RVSP, puuid);

    if (matchLists.success != true) {
      return { success:false, msg:matchLists.msg };
    }

    const matchList = await matchLists.data;
    
    if (matchList.length) {
      return matchList;
    } else {
      return null;
    }
  }

  static async getLeagueId(reqServer, reqId) {
    const RVSP = ValueParse.parse(reqServer);

    const idInfo = await this.#getIdInfo(reqServer,reqId);

    const encryptedId = idInfo.encryptedId;
    const profileIcon = idInfo.profileIcon;
    const summonerName = idInfo.name;
    const summonerLevel = idInfo.level;
    const puuid = idInfo.puuid;

    const leagueIdUrl = `https://${reqServer}.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}`
    return superagent
      .get(leagueIdUrl)
      .set('X-Riot-Token', apiKey)
      .then(async res => {
        if (res.statusCode == 200) {
          const matchList = await this.#getMatchLists(RVSP, puuid);

          const info = {
            profileIcon: profileIcon,
            summonerName: summonerName,
            summonerLevel: summonerLevel,
            reqServer: reqServer,
            matchList: matchList,
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

  static getMatch(reqServer, matchid) {
    const RVSP = ValueParse.parse(reqServer);
    const getMatchUrl = `https://${RVSP}.api.riotgames.com/lol/match/v5/matches/${matchid}`

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