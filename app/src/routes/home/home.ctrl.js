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
  maxAge: oneMonth
};

const serverList = ['KR', 'BR1', 'JP1', 'LA1', 'LA2', 'NA1', 'OC1', 'RU', 'TR1', 'EUN1', 'EUW1'];

const output = {
  home: async (req, res) => {
    const champRotations = await RIOTAPI.getChampRotations(serverList[0]);
    const checkChampRotations = RIOTDATA.checkChampRotations;

    if (checkChampRotations == 0 || champRotations.success == false) {
      console.log(champRotations.msg);
      return res.render('home/main', { serverList, rotations:undefined });
    };
    
    const rotations = [];
    champRotations.data.forEach(champKey => {
      rotations.push([
        checkChampRotations[champKey].id,
        checkChampRotations[champKey].name,
      ]);
    });

    return res.render('home/main', { serverList, rotations });
  },

  showRecord: async (req, res) => {
    const reqServer = req.params.server;
    const reqUserName = encodeURI(req.params.username);
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
        return res.render('home/showrecord', { solo:null, free:null, info:idInfo.info, serverList });
      }
      else if (!idInfo.free) {
        return res.render('home/showrecord', { solo:idInfo.solo, free:null, info:idInfo.info, serverList });
        console.log(idInfo.solo);
        console.log(idInfo.info);
      } else {
        return res.render('home/showrecord', { solo:idInfo.solo, free:idInfo.free, info:idInfo.info, serverList });
        console.log(idInfo.solo);
        console.log(idInfo.free);
        console.log(idInfo.info);
      }
    } else {
      return res.render('home/notfound', { serverList });
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