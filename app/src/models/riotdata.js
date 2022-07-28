'use strict';

const superagent = require('superagent');

const DDRRAGON_BASE_URI = 'https://ddragon.leagueoflegends.com'

class RiotData {
  riotCdnUri = '';
  latestVersion = '';
  runesJson = {};
  championsJson = {};
  champions = [];

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

    const championsJson = await this.getChampions();
    if (championsJson != 0) this.championsJson = championsJson;

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
        console.log('Failed get version Error:', err);
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
        return championsJson;

      })
      .catch(err => {
        console.log('Failed get Champions Error:', err);
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
        console.log('Failed get Runes Error', err);
        return 0
      })
  }
}

module.exports = RiotData;