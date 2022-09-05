'use strict';

const superagent = require('superagent');
const route = require('./serverRoute');
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
        return { success:false, msg:err };
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
    const matchLists = `https://${this.reqs['serverRegion']}.api.riotgames.com/lol/match/v5/matches/by-puuid/${this.reqs['puuid']}/ids?start=0&count=100`

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

          if (res.body.length) {
			      const rankData = this.#rankParse(res.body);
            return { success:true, solo:rankData.solo, free:rankData.free, info:info};
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

          const startTime = body.info.gameStartTimestamp;
          const duration = body.info.gameDuration;
          const queueId = body.info.queueId;

          if (duration == 0 || queueId == 2000 || queueId == 2010 || queueId == 2020) {
            return { success:true, body:{startTime, duration, queueId} }
          }

          const participants = [];
          
          for (let i=0; i<body.info.participants.length; i++) {
            participants.push(
              this.#parseParticipants(body.info.participants, i)
            );
          };

          if(!body.info.gameEndTimestamp) body.info.gameDuration /= 1000;

          const team100_win = body.info.teams[0].win;
          const team200_win = body.info.teams[1].win;

          const matchData = {
            start_time:startTime,
            team100_win:team100_win,
            team200_win:team200_win,
            duration,
            queueId,
            participants,
          }

          return { success:true, body:matchData };
        } else {
          return { success:false };
        }
      })
  }
	
  #rankParse(body) {
    const body1 = body[0]
	  const body2 = body[1]
	
	if (body1.queueType == 'RANKED_SOLO_5x5') {
	  return {solo: body1, free: body2};
	}
	
	return {solo: body2, free: body1};
  }

  #parseParticipants(participants, i) {
    const getFloatFixed = (value, fixed) => { 
      return parseFloat(+(Math.round(value+"e+2")+"e-2")).toFixed(fixed);
    };

    const p = participants[i];

    const summonerName = p.summonerName;
    const kills = p.kills;
    const deaths = p.deaths;
    const assists = p.assists;
    let kda;
    if (deaths == 0) kda = kills+assists;
    else kda = getFloatFixed((kills+assists)/deaths, 2);
    const champLevel = p.champLevel;
    const champKey = p.championId;
    const runeMain = p.perks.styles[0].selections[0].perk;
    const runeSub = p.perks.styles[1].style;
    const spell1 = p.summoner1Id;
    const spell2 = p.summoner2Id
    const item0 = p.item0;
    const item1 = p.item1;
    const item2 = p.item2;
    const item3 = p.item3;
    const item4 = p.item4;
    const item5 = p.item5;
    const item6 = p.item6;
    const goldEarned = p.goldEarned;
    const damageDealt = p.totalDamageDealtToChampions;
    const minionsKilled = p.totalMinionsKilled+p.neutralMinionsKilled;
    const visionScore = p.visionScore;
    const visionWardsBought = p.visionWardsBoughtInGame;
    const teamId = p.teamId;
    const largestMultiKill = p.largestMultiKill;

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
      largest_multi_kill:largestMultiKill,
      gold_earned:goldEarned,
      summoner_name:summonerName,
      damage_dealt:damageDealt,
      minions_killed:minionsKilled,
      vision_score:visionScore,
      vision_wards_bought:visionWardsBought,
      champ_level:champLevel,
      champ_key:champKey,
      rune_main:runeMain,
      rune_sub:runeSub,
      team_id:teamId,
      win:0,
    };

    if (p.win == true) newParticipants.win = 1;

    return newParticipants;
  }
}

module.exports = RiotApi;