const matchIdTags = document.querySelectorAll('.match-record-wrapper');

const matchIds = [];

matchIdTags.forEach(matchid => {
  const getMatch = (server, matchid) => {
    return fetch(`/${server}/match/${matchid}`)
  }

  matchIds.push(
    getMatch(matchid.dataset.server, matchid.dataset.matchid)
  );
});

Promise.all(matchIds)
  .then(async res => {
    const summonerName = document.querySelector('.summonerName').innerText;
    for (let i=0; i<res.length; i++) {

      const gameData = await res[i].json();
      const recentGameHtml = recentGame(gameData, summonerName);

      console.log(recentGameHtml);

      $(`#match-${i}`).append(recentGameHtml);

      break
    }
  });

function recentGame(gameData, summonerName) {
  const gameType = ko[QUEUETYPE[gameData.queueid]];
  console.log(gameData);
  const gameEndTime = timeForToday(gameData.start_time + gameData.duration * 1000);
  const gameDuration = `${Math.floor(gameData.duration/60)}분 ${(gameData.duration % 60).toString().padStart(2,'0')}초`;
  const blueTeamWin = gameData.team100_win;
  const redTeamWin = gameData.team200_win;

  let recentGameHeader = ``;

  for (let i=0; i<gameData.participants.length; i++) {
    const participants = gameData.participants[i];

    const champKey = participants.champ_key;
    const gameResult = participants.win;
    const champNameId = checkChamp(champKey);
    const champImgSrc = `${RIOTCDNURI}/${latestVersion}/img/champion/${champNameId[1]}.png`;
    const spellImgSrc = `${RIOTCDNURI}/${latestVersion}/img/spell`;
    const spell1 = `${spellImgSrc}/${SPELL[participants.spell1]}.png`;
    const spell2 = `${spellImgSrc}/${SPELL[participants.spell2]}.png`;
    const runes = checkRune(participants.rune_main, participants.rune_sub);
    const runeMainSrc = `${RIOTCDNURI}/img/${runes[0][0]}`;
    const runeSubSrc = `${RIOTCDNURI}/img/${runes[1][0]}`;

    let gameResultEn;
    let gameResultKo;
    if (gameResult == 1) {
      gameResultEn = 'WIN';
      gameResultKo = '승리';
    } else {
      gameResultEn = 'LOSE';
      gameResultKo = '패배';
    }

    if (participants.summoner_name == summonerName) {
      recentGameHeader += `
        <div result="${gameResultEn}" class="recent-game-header">
          <div class="game">
            <div class="type">${gameType}</div>
            <div class="time-stamp">${gameEndTime}</div>
            <div class="result">${gameResultKo}</div>
            <div class="length">${gameDuration}</div>
          </div>

          <div class="info">
            <div class="champion">
              <div class="icon">
                <img src="${champImgSrc}" width="48" height="48" alt="${champNameId[1]}">
              </div>
              <div class="spells">
                <div class="spell">
                  <img src="${spell1}" width="22" height="22" alt="spell1">
                  <img src="${spell2}" width="22" heigth="22" alt="spell2">
                </div>
              </div>
              <div class="runes">
                <div class="rune">
                  <img src="${runeMainSrc}" width="22" height="22" alt="${runes[0][1]}">
                  <img src="${runeSubSrc}" width="22" height="22" alt="${runes[1][1]}">
                </div>
              </div>
            </div>
          </div>
        </div>`; 
    }
  }
  
  return recentGameHeader
  // 100 blue 200 red
}

// https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/SummonAery/SummonAery.png


function checkChamp(myChampKey) {
  const champions = Object.keys(CHAMPION);

  let champName;
  let champId;

  champions.forEach(champ => {
    const champKey = CHAMPION[champ].key;
    if (champKey == myChampKey) {
      champId = CHAMPION[champ].id;
      champName = CHAMPION[champ].name;
    }
  })

  return [champName, champId];
}

function checkRune(rune1, rune2) {
  let rune1Icon;
  let rune1Name;
  let rune2Icon;
  let rune2Name;

  RUNE.forEach(data => {
    if (data.id == rune1) {
      rune1Icon = data.slots[0].runes[0].icon;
      rune1Name = data.slots[0].runes[0].name;
    }

    if (data.id == rune2) {
      rune2Icon = data.icon;
      rune2Name = data.name;
    }
  })

  return [[rune1Icon, rune1Name], [rune2Icon, rune2Name]];
}