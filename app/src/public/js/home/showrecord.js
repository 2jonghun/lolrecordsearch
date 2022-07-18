const getServer = getCookie('reqServer');
const puuid = 'mTH75uPmrpynAUXlykeAkcFhyhmAERsutZgf1-mLXe30moR7Q8Vizx-I0D3RMqRtxs2_hwYbKUD0wA';

const continents = {
  america: ['na1', 'br1', 'la1', 'la2'],
  asia: ['kr', 'jp1'],
  europe: ['ru', 'tr1', 'eun1', 'euw1'],
  sea: 'OC1'
}

function checkContinent(server) {
  const continentKey = Object.keys(continents);

  for (continent of continentKey) {
    for (let i = 0; i < continents[continent].length; i++) {
      if (continents[continent][i] === server) {
        return continent;
      }
    }
  }
}

const req = {
  continent: checkContinent(getServer),
  puuid
}

fetch('/getmatchid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(console.error);