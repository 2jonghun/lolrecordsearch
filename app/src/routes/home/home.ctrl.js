'use strict';

const riotapi = require('../../models/riotapi');

const output = {
  home: (req, res) => {
    res.render('home/main');
  },

  showRecord: async (req, res) => {
    const reqServer = req.params.server;
    const reqUserName = encodeURI(req.params.username);
    const idInfo = await riotapi.getIdInfo(reqServer, reqUserName)
    if (idInfo.success == true) {
      console.log(idInfo.data);
      res.render('home/showrecord', { userinfo:idInfo.data });
    } else {
      res.render('home/notfound');
    }
  }
}

const process = {
  getMatchInfo: async (req, res) => {
    const continent = req.body.continent;
    const puuid = req.body.puuid;
    const matchInfos = await riotapi.getMatchInfo(continent, puuid);
    const infoIndex = Object.keys(matchInfos);

    const newInfos = [];

    try {
      for (let i = 0; i < infoIndex.length; i++) {
        if (matchInfos[i].success == true) {
          newInfos.push(matchInfos[i].data);
        } else {
          newInfos.push('false');
        }
      }
      res.send(newInfos);
    }
    catch {
      res.send('false');
    }
  }
}

module.exports = {
  output,
  process,
}