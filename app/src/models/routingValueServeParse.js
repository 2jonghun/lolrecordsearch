'use strict';

// The AMERICAS routing value serves NA, BR, LAN and LAS.The ASIA routing value serves KR and JP.The EUROPE routing value serves EUNE, EUW, TR, and RU.The SEA routing value serves OCE.

const ValueParse = {
  parse: reqServer => {
    const kindOfValue = {
      americas: ['na1', 'br1', 'la1', 'la2'],
      asia: ['kr', 'jp1'],
      europe: ['eun1', 'euw1', 'tr1', 'ru'],
      sea: ['oc1']
    }

    const valueKeys = Object.keys(kindOfValue);

    for (const key of valueKeys) {
      for (let value of kindOfValue[key]) {
        if (reqServer == value) {
          return key;
        }
      }
    }
  }
}

module.exports = ValueParse;