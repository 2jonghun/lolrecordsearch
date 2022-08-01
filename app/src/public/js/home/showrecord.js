const matchidTags = document.querySelectorAll('.match-record-wrraper');

const matchids = [];

matchidTags.forEach(matchid => {
  const getMatch = (server, matchid) => {
    return fetch(`/${server}/match/${matchid}`)
  }

  matchids.push(
    getMatch(matchid.dataset.server, matchid.dataset.matchid)
  );
});

Promise.all(matchids)
  .then(async res => {
    for (let i=0; i<res.length; i++) {
      console.log(await res[i].json());
    }
  })

console.log('test');