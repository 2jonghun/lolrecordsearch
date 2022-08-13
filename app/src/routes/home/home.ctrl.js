'use strict';

const RiotApi = require('../../models/riotapi');
const RiotData = require('../../models/riotdata');

const superagent = require('superagent');

const updateCycleHour = 1;

const RIOTDATA = new RiotData();
RIOTDATA.initialize();

const RIOTAPI = new RiotApi();

// setInterval(() => {
//   RIOTDATA.update();
// }, updateCycleHour * 60 * 60 * 1000);

const oneMonth = 2592000000;
const cookieConfig = {
  maxAge: oneMonth,
};
const singedCookieConfig = {
  maxAge: oneMonth,
  signed: true
};

const serverList = ['kr', 'br1', 'jp1', 'la1', 'la2', 'na1', 'oc1', 'ru', 'tr1', 'eun1', 'euw1'];

const output = {
  home: async (req, res) => {
    let latestServer;
    if (!req.cookies['latest-server']) latestServer = serverList[0];
    else latestServer = req.cookies['latest-server'];
  
    const champRotations = await RIOTAPI.getChampRotations(latestServer);
    const checkChamp = RIOTDATA.checkChamp;

    if (checkChamp == 0 || champRotations.success == false) {
      // console.log(champRotations.msg);
      return res.render('home/main', { serverList, latestServer, rotations:undefined });
    };
    
    const rotations = [];
    champRotations.data.forEach(champKey => {
      rotations.push([
        checkChamp[champKey].id,
        checkChamp[champKey].name,
      ]);
    });

    return res.render('home/main', { serverList, latestServer, rotations });
  },

  showRecord: async (req, res) => {
    const reqServer = req.params.server;
    const reqUserName = encodeURI(req.params.username);

    res.cookie('latest-server', reqServer, cookieConfig);

    RIOTAPI.changeProperty({
      reqServer,
      reqUserName,
    });

    const idInfo = await RIOTAPI.getLeagueId();
    if (idInfo.info) {
      idInfo.info.profileIcon = RIOTDATA.getProfileIcon(idInfo.info.profileIconId);
    }

    if (idInfo.success == true) {
      if (!idInfo.solo) {
        console.log(idInfo.info);
        return res.render('home/showrecord', { solo:null, free:null, info:idInfo.info, serverList, latestServer:reqServer });
      }
      else if (!idInfo.free) {
        return res.render('home/showrecord', { solo:idInfo.solo, free:null, info:idInfo.info, serverList, latestServer:reqServer });
        console.log(idInfo.solo);
        console.log(idInfo.info);
      } else {
        return res.render('home/showrecord', { solo:idInfo.solo, free:idInfo.free, info:idInfo.info, serverList, latestServer:reqServer });
        console.log(idInfo.solo);
        console.log(idInfo.free);
        console.log(idInfo.info);
      }
    } else {
      return res.render('home/notfound', { serverList, latestServer:reqServer });
    }
  }
};

const process = {
  getVersion: (req, res) => {
    const version = RIOTDATA.latestVersion;
    if (version != 0) {
      return res.send(version);
    } else {
      return res.send(undefined);
    };
  },

  getChampions: (req, res) => {
    const champions = RIOTDATA.champions;

    if (champions !=0) return res.send(champions);
    else return res.send(undefined);
  },

  getChampionJson: (req, res) => {
    const championjson = RIOTDATA.championsJson; 

    if(championjson != 0) return res.send(championjson);
    else return res.send(undefined);
  },

  getRunes: (req, res) => {
    const runes = RIOTDATA.runesJson;

    if (runes != 0) return res.json(runes);
    else return res.send(undefined);
  },

  getMatch: async (req, res) => {
    const reqServer = req.params.server;
    RIOTAPI.changeProperty({ 
      reqServer,
    });
    const matchid = req.params.matchid;

    const response = await RIOTAPI.getMatch(matchid);

    if (response.success == true) return res.json(response.body);
    else return res.send(undefined);
  }
};

module.exports = {
  output,
  process,
  RIOTDATA,
};