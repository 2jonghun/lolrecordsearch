const summonerName = document.querySelector('.summonerName').innerText;
document.title = `${summonerName} - LoL Record`;
const soloRankTier = document.querySelector('.solo-tier');
const soloRankTierText = soloRankTier.innerText.split(' ')[0]
if (soloRankTierText == 'GOLD') soloRankTier.style.color = 'black';

const matchIdTags = document.querySelectorAll('.match-record-wrapper');
const matchIds = [];

let matchServer = '';
let matchId = '';

matchIdTags.forEach(matchid => {
  const getMatch = (server, matchid) => {
    return fetch(`/${server}/match/${matchid}`)
  }
  
  matchServer = matchid.dataset.server;
  matchId = matchid.dataset.matchid;

  matchIds.push(
    getMatch(matchServer, matchId)
  );
});

Promise.all(matchIds)
  .then(async res => {
    for (let i=0; i<res.length; i++) {
	  const matchNum = `#match-${i}`;
      const gameData = await res[i].json();
      const recentGameData = recentGame(gameData, summonerName);
	  const recentGameHeader = recentGameData.recentGameHeader;
	  const participantsData = recentGameData.participantsData;
	  const participantsBlue = participantsData.participantsBlue;
	  const participantsRed = participantsData.participantsRed;
	  const topTeamId = participantsData.topTeamId;
	  const blueTeamWin = participantsData.blueTeamWin;
	  const redTeamWin = participantsData.redTeamWin
	  const userNameBlue = recentGameData.userNameBlue;
	  const userNameRed = recentGameData.userNameRed;
	  const blueTotalKills = recentGameData.blueTotalKills;
	  const redTotalKills = recentGameData.redTotalKills;
	  
      const matchWrapper = $(matchNum);
	  const matchWrapper2 = $(`.match${i}-wrapper`);
      matchWrapper.append(recentGameHeader);
	  const userNameBlueTag = $(`${matchNum} > div > .participants > .blue`);
	  const userNameRedTag = $(`${matchNum} > div > .participants > .red`);
	  userNameBlueTag.append(userNameBlue);
	  userNameRedTag.append(userNameRed);
	  
	  let gameResultEnTop;
	  let gameResultKoTop;
	  let gameResultEnBottom;
	  let gameResultKoBottom;
	  let topTeam;
	  let bottomTeam;
	  let participantsTop;
	  let participantsBottom;
	  
	  if (topTeamId == 100) { 
		topTeam = '블루팀';
		bottomTeam = '레드팀';
		if (blueTeamWin == true) {
		  gameResultEnTop = 'WIN';
		  gameResultKoTop = '승리';
		  gameResultEnBottom = 'LOSE';
		  gameResultKoBottom = '패배';
		  participantsTop = participantsBlue;
		  participantsBottom = participantsRed;
		} else {
		  gameResultEnBottom = 'WIN';
		  gameResultKoBottom = '승리';
		  gameResultEnTop = 'LOSE';
		  gameResultKoTop = '패배';
		  participantsTop = participantsRed;
		  participantsBottom = participantsBlue;
		}
	  }
	  else { 
	    topTeam = '레드팀';
		bottomTeam = '블루팀';
		if (redTeamWin == true) {
		  gameResultEnTop = 'WIN';
		  gameResultKoTop = '승리';
		  gameResultEnBottom = 'LOSE';
		  gameResultKoBottom = '패배';
		  participantsTop = participantsRed;
		  participantsBottom = participantsBlue;
		} else {
		  gameResultEnBottom = 'WIN';
		  gameResultKoBottom = '승리';
		  gameResultEnTop = 'LOSE';
		  gameResultKoTop = '패배';
		  participantsTop = participantsBlue;
		  participantsBottom = participantsRed;
		}
	  }

	  const mainRunes = {};

	  for (let i = 0; i < participantsTop.length; i++) {
		mainRunes[`runeTop${i}`] = checkRune(participantsTop[i].rune_main, participantsTop[i].rune_sub)
	  }

	  for (let i = 0; i < participantsBottom.length; i++) {
		mainRunes[`runeBottom${i}`] = checkRune(participantsBottom[i].rune_main, participantsTop[i].rune_sub)
	  }
		
	  let recentGameMain = ``;
		
	  recentGameMain += `
	    <div class="recent-game-main">
	      <div result="${gameResultEnTop}">
		    <table result="${gameResultEnTop}">
	  		  <colgroup>
	  			<col width="25%">
				<col width="15%">
				<col width="20%">
				<col width="10%">
				<col width="30%">
			  </colgroup>
		      <thead>
			    <tr>
			      <th scope="col"><div class="result"><span>${gameResultKoTop}(${topTeam})</span></div></th>
			      <th scope="col">KDA</th>
				  <th scope="col">피해량</th>
			      <th scope="col">CS</th>
				  <th scope="col">아이템</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[0].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsTop[0].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[0].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[0].spell2]}.png" width="16" height="16">
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop0[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeTop0[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
	  				<span><a href="/summoners/${matchServer}/${participantsTop[0].summoner_name}">${participantsTop[0].summoner_name}</a></span>
				  </td>
				  <td class="main-kda">${participantsTop[0].kda}</td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[1].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsTop[1].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[1].spell1]}.png" width="16" height="16"">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[1].spell2]}.png" width="16" height="16">
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop1[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeTop1[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  <span><a href="/summoners/${matchServer}/${participantsTop[1].summoner_name}">${participantsTop[1].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[2].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsTop[2].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[2].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[2].spell2]}.png" width="16" height="16">
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop2[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeTop2[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  <span><a href="/summoners/${matchServer}/${participantsTop[2].summoner_name}">${participantsTop[2].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[3].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsTop[3].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[3].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[3].spell2]}.png" width="16" height="16">
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop3[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeTop3[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  <span><a href="/summoners/${matchServer}/${participantsTop[3].summoner_name}">${participantsTop[3].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[4].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsTop[4].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[4].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[4].spell2]}.png" width="16" height="16">
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop4[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeTop4[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  <span><a href="/summoners/${matchServer}/${participantsTop[4].summoner_name}">${participantsTop[4].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>				
			  </tbody>
		    </table>
		  </div>
		
	      <div result="${gameResultEnBottom}">
		    <table result="${gameResultEnBottom}">
	  		  <colgroup>
	  			<col width="25%">
				<col width="15%">
				<col width="20%">
				<col width="10%">
				<col width="30%">
			  </colgroup>
		      <thead>
			    <tr>
			      <th scope="col"><div class="result"><span>${gameResultKoBottom}(${bottomTeam})</span></div></th>
			      <th scope="col">KDA</th>
				  <th scope="col">피해량</th>
			      <th scope="col">CS</th>
				  <th scope="col">아이템</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[0].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsBottom[0].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[0].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[0].spell2]}.png" width="16" height="16">
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom0[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeBottom0[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  	<span><a href="/summoners/${matchServer}/${participantsBottom[0].summoner_name}">${participantsBottom[0].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[1].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsBottom[1].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[1].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[1].spell2]}.png" width="16" height="16">			  
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom1[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeBottom1[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  <span><a href="/summoners/${matchServer}/${participantsBottom[1].summoner_name}">${participantsBottom[1].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[2].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsBottom[2].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[2].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[2].spell2]}.png" width="16" height="16">			  
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom2[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeBottom2[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  <span><a href="/summoners/${matchServer}/${participantsBottom[2].summoner_name}">${participantsBottom[2].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[3].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsBottom[3].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[3].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[3].spell2]}.png" width="16" height="16">			  
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom3[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeBottom3[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  <span><a href="/summoners/${matchServer}/${participantsBottom[3].summoner_name}">${participantsBottom[3].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>
			    <tr>
				  <td class="main-champion">
				    <div class="main-icon">
					  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[4].champ_key)[1]}.png" width="32" height="32">
					  <span class="main-champ-level">${participantsBottom[4].champ_level}</span>
					</div>
				  </td>
				  <td class="main-spells">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[4].spell1]}.png" width="16" height="16">
	  				<img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[4].spell2]}.png" width="16" height="16">			  
				  </td>
				  <td class="main-runes">
					<img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom4[0][0]}" width="16" height="16">
					<img src="${RIOTCDNURI}/img/${mainRunes.runeBottom4[1][0]}" width="16" height="16">
				  </td>
				  <td class="main-name">
				  <span><a href="/summoners/${matchServer}/${participantsBottom[4].summoner_name}">${participantsBottom[4].summoner_name}</a></span>
				  </td>
				  <td class="main-kda"></td>
				  <td class="main-damage"></td>
				  <td class="main-cs"></td>
				  <td class="main-items"></td>
			    </tr>				
			  </tbody>
		    </table>
		  </div>
		</div>`;
	
	  matchWrapper2.append(recentGameMain);
	  matchWrapper2.css('width', '100%');
	
	  const kills = Number($(`${matchNum} > div > .info > .kda > .k-d-a > .kills`).text());
	  const assists = Number($(`${matchNum} > div > .info > .kda > .k-d-a > .assists`).text());
	  
	  const teamId = $(`${matchNum} > div > .info > .stats > .p-kill`);
	  if (teamId.attr('teamid') == 100) teamId.html(` 킬관여 <span>${getFloatFixed(((kills+assists)/blueTotalKills) * 100, 0)}%</span>`);
	  else teamId.html(` 킬관여 <span>${getFloatFixed(((kills+assists)/redTotalKills) * 100, 0)}%</span>`);
		
	  const gameResultText = $(`${matchNum} > div > .game > .result`);

      const gameResult = $(`${matchNum} > div`).attr('result');
      if (gameResult == 'WIN') {
	    matchWrapper.css('background', '#406893');
		gameResultText.css('color', '#408FFF');
	  }
      else {
		matchWrapper.css('background', '#683240');
		gameResultText.css('color', '#cc0000');
	  }

	  const multiKill = $(`${matchNum} > div > .info > .kda > .multi_kill`);
	  if (multiKill.attr('result')) multiKill.css('font-size', '12px').css('width', '62px').css('height', '26px')
		  .css('background', '#8B0000').css('margin-top', '12px').css('text-align', 'center').css('display', 'flex')
		  .css('justify-content', 'center').css('align-items', 'center').css('border-radius', '1em');
    }
   $("#div_load_image").hide();
   $('.match-record-wrapper').css('display', 'grid');
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
  let participantsData = {participantsBlue:[], participantsRed:[], topTeamId:'', blueTeamWin, redTeamWin};
  let userNameBlue = ``;
  let userNameRed = ``;

  for (let i=0; i<gameData.participants.length; i++) {
    const participants = gameData.participants[i];
	
	const pSummonerName = participants.summoner_name;
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
	let multiKill = participants.multi_kill;
    let kda = participants.kda;
	
	let kdaColor;
	if (kda < 3) kdaColor = '#808080';
	else kdaColor = ''
	  
	if (multiKill == 2) multiKill = '더블 킬';
	else if (multiKill == 3) multiKill = '트리플 킬';
	else if (multiKill == 4) multiKill = '쿼드라 킬';
	else if (multiKill == 5) multiKill = '펜타 킬';
	else multiKill = '';
	  
    let gameResultEn;
    let gameResultKo;
    if (gameResult == 1) {
      gameResultEn = 'WIN';
      gameResultKo = '승리';
    } else {
      gameResultEn = 'LOSE';
      gameResultKo = '패배';
    }

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
	
    if (deaths == 0) kda = 'perpect';

    if (pSummonerName == summonerName) {
      recentGameHeader += `
        <div result="${gameResultEn}" teamid="${teamId}" class="recent-game-header">
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
                  <img class="spell_1" src="${spell1}" width="26" height="26" alt="spell1">
                  <img class="spell_2" src="${spell2}" width="26" heigth="26" alt="spell2">
                </div>
              </div>
              <div class="runes">
                <div class="rune">
                  <img class="rune_main" src="${runeMainSrc}" width="26" height="26" alt="${runes[0][1]}">
                  <img class="rune_sub" src="${runeSubSrc}" width="26" height="26" alt="${runes[1][1]}">
                </div>
              </div>
            </div>
            <div class="kda">
              <div class="k-d-a">
                <span class="kills">${kills}</span>
                /
                <span class="deaths">${deaths}</span>
                /
                <span class="assists">${assists}</span>
              </div>
              <div class="kda_ratio">
                <span class="ratio">${kda}:1</span>
                평점
              </div>
			  <div class="multi_kill" result="${multiKill}">
			  	<span>${multiKill}</span>
			  </div>
            </div>
            <div class="stats">
              <div teamid="${teamId}" class="p-kill"></div>
              <div class="ward">
                <span>제어와드 ${visionWards}</span>
              </div>
              <div class="cs">
                <span>CS ${minionsKilled}(${minMinionsKilled})</span>
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
		  <div class="participants"><ul class="blue"></ul><ul class="red"></ul></div>
        </div>`;
	  if (teamId == 100) {
		blueTotalKills += kills;
		participantsData.participantsBlue.push(participants);
		participantsData.topTeamId = participants.team_id;
	    userNameBlue += `<li><div class="p-icon"><img src="${champImgSrc}" weight="16" height="16" alt="${champNameId[1]}"></div><a href="/summoners/${matchServer}/${pSummonerName}" style="font-weight: bold;">${pSummonerName}</a></li>`;
	  }
	  else {
		redTotalKills += kills;
		participantsData.participantsRed.push(participants);
		participantsData.topTeamId = participants.team_id;
	    userNameRed += `<li><div class="p-icon"><img src="${champImgSrc}" weight="16" height="16" alt="${champNameId[1]}"></div><a href="/summoners/${matchServer}/${pSummonerName}" style="font-weight: bold;">${pSummonerName}</a></li>`;
	  }
    } else {
	  if (teamId == 100) {
	    blueTotalKills += kills;
		participantsData.participantsBlue.push(participants);
	    userNameBlue += `<li><div class="p-icon"><img src="${champImgSrc}" weight="16" height="16" alt="${champNameId[1]}"></div><a href="/summoners/${matchServer}/${pSummonerName}">${pSummonerName}</a></li>`;
	  }
    else {
	    redTotalKills += kills;
		participantsData.participantsRed.push(participants);
	    userNameRed += `<li><div class="p-icon"><img src="${champImgSrc}" weight="16" height="16" alt="${champNameId[1]}"></div><a href="/summoners/${matchServer}/${pSummonerName}">${pSummonerName}</a></li>`;
	  }
	}
  }
  return {recentGameHeader, participantsData, userNameBlue, userNameRed, blueTotalKills, redTotalKills}
  // 100 blue 200 red
}

function checkChamp(myChampKey) {
  let champName;
  let champId;
	
  const champions = Object.keys(CHAMPION);

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