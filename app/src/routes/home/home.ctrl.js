'use strict';

const riotapi = require('../../models/riotapi');

const oneMonth = 2592000000;
const cookieConfig = {
  maxAge: 100000
}

const RIOTCDNURI = 'https://ddragon.leagueoflegends.com/cdn/';


const output = {
  home: (req, res) => {
    res.render('home/main');
  },

  showRecord: async (req, res) => {
    const reqServer = req.params.server;
    const reqUserName = encodeURI(req.params.username);
    const idInfo = await riotapi.getLeagueId(reqServer, reqUserName)
    if (idInfo.success == true) {
      if (!idInfo.solo) {
        console.log(idInfo.info);
        res.render('home/showrecord', { solo:null, free:null, info:idInfo.info });
      }
      if (!idInfo.free) {
        res.render('home/showrecord', { solo:idInfo.solo, free:null, info:idInfo.info });
        console.log(idInfo.solo);
      } else {
        res.render('home/showrecord', { solo:idInfo.solo, free:idInfo.free, info:idInfo.info });
        console.log(idInfo.solo);
        console.log(idInfo.free);
        console.log(idInfo.info);
      }
    } else {
      res.render('home/notfound');
    }
  }
}

const process = {
  getVersion: async (req, res) => {
    const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');

    if (response.status == 200) {
      const versions = await response.json();
      return res.send(versions[0]);
    } else {
      return res.send(null);
    }
  },

  getChampion: async (req, res) => {
    const latestVersion = req.cookies.latestVersion;
    const response = await fetch(`${RIOTCDNURI}${latestVersion}/data/ko_KR/champion.json`);

    if (response.status == 200) {
      const champions = await response.json();
      return res.json(champions);
    } else {
      return res.send(null);W
    }
  }
}

module.exports = {
  output,
  process,
}