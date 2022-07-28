async function getMatch() {
  const matchids = document.querySelectorAll('.match-record-wrraper');

  if (!matchids.length) {
    return;
  }

  const reqServer = matchids[0].dataset.server;
  for (let i=0; i<matchids.length; i++) {
    const matchid = matchids[i].dataset.matchid;
    const res = await fetch(`/${reqServer}/match/${matchid}`);
    
    if (res.status == 200) {
      const matchData = await res.json();
      break
    }
  }
}

getMatch();