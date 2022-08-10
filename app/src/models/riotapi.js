'use strict';

const superagent = require('superagent');
const db = require('../config/db');
const route = require('../config/serverRoute');

const apiKey = process.env.RIOTAPIKEY;
const middleUri = 'api.riotgames.com'

class RiotApi {
  reqs = {
    reqServer: 'kr',
    reqUserName: '',
    puuid: '',
    encryptedId: '',
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
    const champRotationsUri = `https://${this.reqs['reqServer']}.api.riotgames.com/lol/platform/v3/champion-rotations`;

    return superagent
      .get(champRotationsUri)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) return { success:true, data:res.body.freeChampionIds };
        else return { success:false };
      })
      .catch(err => {
        return { success:false, msg:err.response.error };
      })
  }

  getIdInfo() {
    const idInfoUrl = `https://${this.reqs['reqServer']}.${middleUri}/lol/summoner/v4/summoners/by-name/${this.reqs['reqUserName']}`

    return superagent
      .get(idInfoUrl)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res.body);
          const data = {
            encryptedId:res.body.id,
            profileIconId:res.body.profileIconId,
            puuid:res.body.puuid,
            name:res.body.name,
            level:res.body.summonerLevel,
          }
          return { success:true, data };
        } else {
          return { success:false, msg:res.status };
         }
       })
      .catch(err => {
        return { success:false, msg:err };
      });
  }

  getMatchLists() {
    const matchLists = `https://${this.reqs['serverRegion']}.api.riotgames.com/lol/match/v5/matches/by-puuid/${this.reqs['puuid']}/ids?start=0&count=2`

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
    const idInfo = await this.getIdInfo();
    if (idInfo.success != true) return { success:false, msg:idInfo.msg}

    const profileIconId = idInfo.data.profileIconId;
    const summonerName = idInfo.data.name;
    const summonerLevel = idInfo.data.level;

    this.reqs['puuid'] = idInfo.data.puuid;
    this.reqs['encryptedId'] = idInfo.data.encryptedId;

    const leagueIdUri = `https://${this.reqs['reqServer']}.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.reqs['encryptedId']}`
    return superagent
      .get(leagueIdUri)
      .set('X-Riot-Token', apiKey)
      .then(async res => {
        if (res.statusCode == 200) {
          let matchList = await this.getMatchLists();
          if (matchList.success != true) matchList = undefined;

          const info = {
            profileIconId,
            summonerName,
            summonerLevel,
            reqServer: this.reqs['reqServer'],
            matchList: matchList.data,
          };
          console.log(res.body);

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
    const matchUri = `https://${this.reqs['serverRegion']}.api.riotgames.com/lol/match/v5/matches/${matchid}`;

    return superagent
      .get(matchUri)
      .set('X-Riot-Token', apiKey)
      .then(res => {
        if (res.statusCode == 200) {
          const body = res.body;
          const participants = [];
          
          for (let i=0; i<body.info.participants.length; i++) {
            participants.push(
              this.#parseParticipants(body.info.participants, i)
            );
          };

          if(!body.info.gameEndTimestamp) body.info.gameDuration /= 1000;

          const matchData = {
            start_time:body.info.gameStartTimestamp,
            duration:body.info.gameDuration,
            queueid:body.info.queueId,
            team100_win:body.info.teams[0].win,
            team200_win:body.info.teams[1].win,
            participants,
          }

          return { success:true, body:matchData };
        } else {
          return { success:false };
        }
      })
  }

  #parseParticipants(participants, i) {
    const getFloatFixed = (value, fixed) => {
      if (value == 0) return 
      return Number(parseFloat(+(Math.round(value+"e+2")+"e-2")).toFixed(fixed));
    };

    const summonerName = participants[i].summonerName;
    const kills = participants[i].kills;
    const deaths = participants[i].deaths;
    const assists = participants[i].assists;
    let kda;
    if (deaths == 0) kda = kills+assists;
    else kda = getFloatFixed((kills+assists)/deaths, 2);
    const champLevel = participants[i].champLevel;
    const champId = participants[i].championId;
    const runeMain = participants[i].perks.styles[0].style;
    const runeSub = participants[i].perks.styles[1].style;
    const spell1 = participants[i].spell1Casts;
    const spell2 = participants[i].spell2Casts
    const item0 = participants[i].item0;
    const item1 = participants[i].item1;
    const item2 = participants[i].item2;
    const item3 = participants[i].item3;
    const item4 = participants[i].item4;
    const item5 = participants[i].item5;
    const item6 = participants[i].item6;
    const damageDealt = participants[i].totalDamageDealtToChampions;
    const minionsKilled = participants[i].totalMinionsKilled
      +participants[i].neutralMinionsKilled;
    const visionScore = participants[i].visionScore;
    
    let multiKill;
    if (!participants[i].challenges) multiKill = 0;
    else multiKill = participants[i].challenges.multikills;

    const newParticipants = {
      kills,
      deaths,
      assists,
      kda,
      spell1,
      spell2,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      multi_kill:multiKill,
      summoner_name:summonerName,
      damage_dealt:damageDealt,
      minions_killed:minionsKilled,
      vision_score:visionScore,
      champ_level:champLevel,
      champ_id:champId,
      rune_main:runeMain,
      rune_sub:runeSub,
      win:0,
    };

    if (participants[i].win == true) newParticipants.win = 1;

    return newParticipants;
  }
}

module.exports = RiotApi;