'use strict';

const serverRoute = {
  getRegion: server => {
    const serverRegion = {
      'na1': 'americas',
      'br1': 'americas',
      'la1': 'americas',
      'la2': 'americas',
      'kr': 'asia',
      'jp1': 'asia',
      'tr1': 'europe',
      'ru': 'europe',
      'eun1': 'europe',
      'euw1': 'europe',
      'oc1': 'sea',
    };

    return serverRegion[server];
  }
};

module.exports = {
  serverRoute,
};