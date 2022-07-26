'use strict';

const riotapi = require('../../models/riotapi');
const riotcdn = require('../../models/riotcdn');
const superagent = require('superagent');

const oneMonth = 2592000000;
const cookieConfig = {
  maxAge: oneMonth
};

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
        res.cookie('reqServer', reqServer, cookieConfig);
        res.render('home/showrecord', { solo:null, free:null, info:idInfo.info });
      }
      else if (!idInfo.free) {
        res.render('home/showrecord', { solo:idInfo.solo, free:null, info:idInfo.info });
        console.log(idInfo.solo);
        console.log(idInfo.info);
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
    const response = await riotcdn.getVersion();

    if (response.success == true) {
      const versions = await response.body;
      return res.send(versions[0]);
    } else {
      return res.send(null);
    }
  },

  getChampion: async (req, res) => {
    const latestVersion = req.cookies.latestVersion || '12.13.1';
    const response = await riotcdn.getChampion(latestVersion);

    if (response.success == true) {
      const champions = await response.body.data;
      return res.json(champions);
    } else {
      return res.send(null);
    }
  },

  getMatch: async(req, res) => {
    const reqServer = req.params.server;
    const matchid = req.params.matchid;

    const response = await riotapi.getMatch(reqServer, matchid);

    if (response.success == true) {
      // console.log(response.body.info);
      return res.json(response.body.info);
    }
  }
}

module.exports = {
  output,
  process,
}