'use strict';
const riotapi = require('../../models/riotapi');

const output = {
  home: (req, res) => {
    res.render('home/index');
  },

  showRecord: async (req, res) => {
    const reqServer = req.params.server;
    const reqUserName = encodeURI(req.params.username);
    const idInfo = await riotapi.getIdInfo(reqServer, reqUserName)
    if (idInfo.success == true) {
      console.log(idInfo.data);
      res.render('home/showrecord', { data:idInfo.data });
    } else {
      res.render('home/notfound');
    }
  }
}

const process = {
  getIdInfo: (req, res) => {
// 
  }
}

module.exports = {
  output,
  process,
}