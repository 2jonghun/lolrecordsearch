'use strict';

const superagent = require('superagent');

const DDRRAGON_BASE_URI = 'https://ddragon.leagueoflegends.com'

class RiotData {
  riotCdnUri = '';
  latestVersion = '';
  runesJson = {};
  championsJson = {};
  champions = [];
  checkChampRotations = {};

  initialize() {
    this.update();
  }

  async update() {
    console.log('CDN Update Start');
    const version = await this.getVersion();

    if (version != 0) {
      this.latestVersion = version;
      this.riotCdnUri = `${DDRRAGON_BASE_URI}/cdn/${this.latestVersion}`;
    };

    const championsData = await this.getChampions();
    if (championsData != 0) {
      this.championsJson = championsData[0];
      this.champions = championsData[1];
  
      this.champions.forEach(champ => {
        const champKey = this.championsJson[champ].key;
        const champName = this.championsJson[champ].name;
        const champId = this.championsJson[champ].id;
        this.checkChampRotations[champKey] = {
          name: champName,
          id: champId,
        };
      });
    }

    const runesJson = await this.getRunes();
    if (runesJson != 0) this.runesJson = runesJson;

    console.log('CDN Update End');
  }

  getVersion() {
    const versionUri = `${DDRRAGON_BASE_URI}/api/versions.json`

    return superagent.get(versionUri)
      .then(res => {

        if (res.statusCode != 200) {
          console.log('Failed get version Status Code:', res.statusCode);
          return 0
        }

        const currentVersion = res.body[0]
        console.log('Success get CDN version:', currentVersion);
        return currentVersion;

      })
      .catch(err => {
        console.log('Failed get version', err);
        return 0
      });
  }

  getChampions() {
    const championUri = `${this.riotCdnUri}/data/ko_KR/champion.json`

    return superagent.get(championUri)
      .then(res => {

        if (res.statusCode != 200) {
          console.log('Failed get Champions Status Code:', res.statusCode);
          return 0
        }

        let latestChamp = undefined;

        const championsJson = res.body.data;
        const champions = Object.keys(championsJson);

        if (this.champions) {
          latestChamp = champions.filter(x => !this.champions.includes(x));
        }
        if (latestChamp.toString() == [] || this.champions.toString() == []) {
          latestChamp = undefined;
        }

        this.champions = champions;
        console.log('Success get Champions Latest Update Champion:', latestChamp);
        return [championsJson, champions];

      })
      .catch(err => {
        console.log('Failed get Champions', err);
        return 0
      });
  }

  getRunes() {
    const runeUri = `${this.riotCdnUri}/data/ko_KR/runesReforged.json`;

    return superagent.get(runeUri)
      .then(res => {
        
        if (res.statusCode != 200) {
          console.log('Failed get Runes Status Code:', res.statusCode);
          return 0
        }

        const runesJson = res.body;
        console.log('Success get Runes')

        return runesJson;
      })
      .catch(err => {
        console.log('Failed get Runes', err);
        return 0
      })
  }

  getProfileIcon(profileIconId) {
    return `${this.riotCdnUri}/img/profileicon/${profileIconId}.png`
  }
}

module.exports = RiotData;