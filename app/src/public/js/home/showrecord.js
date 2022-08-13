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

      const matchN = $(`#match-${i}`);

      matchN.append(recentGameHtml);
      const gameResult = $(`#match-${i} > div`).attr('result');
      if (gameResult == 'WIN') matchN.css('background', '#406893');
      else matchN.css('background', '#683240');

      // break
    }
  });

function recentGame(gameData, summonerName) {
  const gameType = ko[QUEUETYPE[gameData.queueid]];
  const gameEndTime = timeForToday(gameData.start_time + gameData.duration * 1000);
  const gameDuration = `${Math.floor(gameData.duration/60)}분 ${(gameData.duration % 60).toString().padStart(2,'0')}초`;
  const blueTeamWin = gameData.team100_win;
  const redTeamWin = gameData.team200_win;

  const itemUri = 'https://ddragon.bangingheads.net/cdn/latest/img/item';

  let blueTotalKills = 0;
  let redTotalKills = 0;
  let recentGameHeader = ``;

  for (let i=0; i<gameData.participants.length; i++) {
    const participants = gameData.participants[i];

    const champKey = participants.champ_key;
    const gameResult = participants.win;
    const champNameId = checkChamp(champKey);
    const champLevel = participants.champ_level;
    const champImgSrc = `${RIOTCDNURI}/${latestVersion}/img/champion/${champNameId[1]}.png`;
    const spellImgSrc = `${RIOTCDNURI}/${latestVersion}/img/spell`;
    const spell1 = `${spellImgSrc}/${SPELL[participants.spell1]}.png`;
    const spell2 = `${spellImgSrc}/${SPELL[participants.spell2]}.png`;
    const item0 = participants.item0;
    const item1 = participants.item1;
    const item2 = participants.item2;
    const item3 = participants.item3;
    const item4 = participants.item4;
    const item5 = participants.item5;
    const item6 = participants.item6;
    const runes = checkRune(participants.rune_main, participants.rune_sub);
    const runeMainSrc = `${RIOTCDNURI}/img/${runes[0][0]}`;
    const runeSubSrc = `${RIOTCDNURI}/img/${runes[1][0]}`;
    const kills = participants.kills;
    const deaths = participants.deaths;
    const assists = participants.assists;
    const minionsKilled = participants.minions_killed;
    const minMinionsKilled = getFloatFixed(minionsKilled/(gameData.duration/60), 1);
    const visionWards = participants.vision_wards_bought;
    const teamId = participants.team_id;
    let kda = `${participants.kda}:1`;

    if (deaths == 0) kda = 'perpect';
    if (teamId == 100) blueTotalKills += kills;
    else redTotalKills += kills;

    let itemTag0;
    let itemTag1;
    let itemTag2;
    let itemTag3;
    let itemTag4;
    let itemTag5;
    let itemTag6;
    if (item0 != 0) itemTag0 = `<img src="${itemUri}/${item0}.png" width="26" height="26" alt="item0">`;
    else itemTag0 = `<div class="item0"></div>`;
    if (item1 != 0) itemTag1 = `<img src="${itemUri}/${item1}.png" width="26" height="26" alt="item1">`;
    else itemTag1 = `<div class="item1"></div>`;
    if (item2 != 0) itemTag2 = `<img src="${itemUri}/${item2}.png" width="26" height="26" alt="item2">`;
    else itemTag2 = `<div class="item2"></div>`;
    if (item3 != 0) itemTag3 = `<img src="${itemUri}/${item3}.png" width="26" height="26" alt="item3">`;
    else itemTag3 = `<div class="item3"></div>`;
    if (item4 != 0) itemTag4 = `<img src="${itemUri}/${item4}.png" width="26" height="26" alt="item4">`;
    else itemTag4 = `<div class="item4"></div>`;
    if (item5 != 0) itemTag5 = `<img src="${itemUri}/${item5}.png" width="26" height="26" alt="item5">`;
    else itemTag5 = `<div class="item5"></div>`;
    if (item6 != 0) itemTag6 = `<img src="${itemUri}/${item6}.png" width="26" height="26" alt="item6">`;
    else itemTag6 = `<div class="item6"></div>`;

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
            <br>
            <div class="result">${gameResultKo}</div>
            <div class="length">${gameDuration}</div>
          </div>

          <div class="info">
            <div class="champion">
              <div class="icon">
                <img src="${champImgSrc}" width="54" height="54" alt="${champNameId[1]}">
                <span class="champ-level">${champLevel}</span>
              </div>
              <div class="spells">
                <div class="spell">
                  <img src="${spell1}" width="26" height="26" alt="spell1">
                  <img src="${spell2}" width="26" heigth="26" alt="spell2">
                </div>
              </div>
              <div class="runes">
                <div class="rune">
                  <img src="${runeMainSrc}" width="26" height="26" alt="${runes[0][1]}">
                  <img src="${runeSubSrc}" width="26" height="26" alt="${runes[1][1]}">
                </div>
              </div>
            </div>
            <div class="kda">
              <div class="k-d-a">
                <span>${kills}</span>
                /
                <span>${deaths}</span>
                /
                <span>${assists}</span>
              </div>
              <div class="ratio">
                <span>
                ${kda}
                </span>
                평점
              </div>
            </div>
            <div class="stats">
              <div class="p-kill">
                <span>킬관여</span>
              </div>
              <div class="ward">
                <span>제어와드 ${visionWards}</span>
              </div>
              <div class="cs">
                <span>${minionsKilled}(${minMinionsKilled})</span>
              </div>
            </div>
            <div class="items">
              <div class="item0">
                ${itemTag0}
              </div>
              <div class="item1">
                ${itemTag1}
              </div>
              <div class="item2">
                ${itemTag2}
              </div>
              <div class="item3">
                ${itemTag3}
              </div>
              <div class="item4">
                ${itemTag4}
              </div>
              <div class="item5">
                ${itemTag5}
              </div>
              <div class="item6">
                ${itemTag6}
              </div>
            </div>
          </div>
        </div>
      `; 
    }
  }
  return recentGameHeader
  // 100 blue 200 red
}


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
  let runeMain;
  let rune1Icon;
  let rune1Name;
  let rune2Icon;
  let rune2Name;

  const getRuneMain = runeMain => {
    runeMain.forEach(data => {
      if (data.id == rune1[1]) {
        rune1Icon = data.icon;
        rune1Name = data.name;
      }
    })
  }

  RUNE.forEach(data => {
    if (data.id == rune1[0]) {
      runeMain = data.slots[0].runes;
      getRuneMain(runeMain);
    }

    if (data.id == rune2) {
      rune2Icon = data.icon;
      rune2Name = data.name;
    }
  })

  return [[rune1Icon, rune1Name], [rune2Icon, rune2Name]];
}