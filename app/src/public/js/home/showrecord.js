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
      const gameData = await res[i].json();
      const gameType = ko[QUEUETYPE[gameData.queueid]];
      console.log(gameData);
      const gameEndTime = timeForToday(gameData.start_time + gameData.duration * 1000);
      const gameDuration = `${getFloatFixed(gameData.duration / 60, 2)}`;

      console.log(gameDuration, gameEndTime, gameType);
      
      // break
    }
  });

console.log('test');