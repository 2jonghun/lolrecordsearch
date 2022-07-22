'use strict';

const riotapi = require('../../models/riotapi');

const oneMonth = 2592000000;
const cookieConfig = {
  maxAge: 100000
}

const output = {
  home: (req, res) => {
    res.render('home/main');
  },

  showRecord: async (req, res) => {
    const reqServer = req.params.server;
    const reqUserName = encodeURI(req.params.username);
    const idInfo = await riotapi.getLeagueId(reqServer, reqUserName)
    if (idInfo.success == true) {
      console.log(idInfo.data[0]);
      idInfo.data[0].profileIconId = idInfo.profileIconId;
      res.render('home/showrecord', { userinfo:idInfo.data[0] });
    } else {
      res.render('home/notfound');
    }
  }
}

const process = {
  // getLeagueId: async (req, res) => {
  //   const reqServer = req.params.server;
  //   const encryptedId = req.params.encryptedId;
  //   const leagueId = await riotapi.getLeagueId(reqServer, encryptedId);
  //   if (leagueId.success == true) {
  //     return res.json(leagueId.data);
  //   }
  // }
}

module.exports = {
  output,
  process,
}