'use strict';

const superagent = require('superagent');

const RIOTCDNURI = 'https://ddragon.leagueoflegends.com/cdn/';

class RiotCdn {
  static getVersion() {
    const getVersionUrl = 'https://ddragon.leagueoflegends.com/api/versions.json'

    return superagent.get(getVersionUrl)
      .then(res => {
        if (res.statusCode == 200) {
          return { success:true, body:res.body };
        } else {
          return { success:false };
        }
      })
  }

  static getChampion(latestVersion) {
    const getChampionUrl = `${RIOTCDNURI}${latestVersion}/data/ko_KR/champion.json`;

    return superagent.get(getChampionUrl)
      .then(res => {
        if (res.statusCode == 200) {
          return { success:true, body:res.body };
        } else {
          return { success:false };
        }
      })
  }
}

module.exports = RiotCdn;