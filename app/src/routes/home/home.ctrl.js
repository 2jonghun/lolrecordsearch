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
  getMatchId: async (req, res) => {
    const puuid = req.body.puuid;
    const continent = req.body.continent;
    const matchInfo = await riotapi.getMatchId(continent, puuid);
    if (matchInfo.success == true) {
      res.send(matchInfo.data);
    }
  }
}

module.exports = {
  output,
  process,
}