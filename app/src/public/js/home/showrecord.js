const summonerName = document.querySelector('.summonerName').innerText;
document.title = `${summonerName} - 게임 전적 - LoL Record`;

const soloRankTier = document.querySelector('.solo-tier');
const soloRankTierText = soloRankTier.innerText.split(' ')[0]
// if (soloRankTierText == 'GOLD') soloRankTier.style.color = 'black';

const themeCookie = getCookie('theme');

if (themeCookie == 'dark') {
  themeDarkModeBtn.className = 'dark-mode';
  themeLightModeBtn.className = 'light-mode-hide';
  mainContent.style.background = '#1C1C1F';
  contentUserProfile.style.background = '#31313C';
  contentUserProfile.style.color = '#F5F5F5';
  matchRecord.style.background = '#31313C';
  loadingImage.style.color = '#F5F5F5';
  moreBtn.style.border = '1.5px #1C1C1F solid';
  moreBtn.style.background = '#202124';
  moreBtn.style.color = '#F5F5F5';
  mainFooter.style.background = '#31313C';
  mainFooter.style.color = '#F5F5F5';
} else {
  themeDarkModeBtn.className = 'dark-mode-hide';
}

	//   밝은 파랑 #E7EFFF
	//   파랑 사이드 #C1D0F2
	//   파랑 메인 #CCDBFF
	
	//   밝은 레드 #FFEEF0
	//   레드 사이드 #FECFD1
	//   레드 메인 #FECFD1

	//    다시하기 #F5F5F8
	//    사이드   #E6EAEE
	//     메인    #E6EAEE

const itemUri = 'https://ddragon.bangingheads.net/cdn/latest/img/item';

const matchIdTags = document.querySelectorAll('.match-record-wrapper');
const matchIds = [];

let matchCount = matchIdTags.length;

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
	let matchI;
    for (matchI=0; matchI<res.length; matchI++) {
	  const matchNum = `#match-${matchI}`;
	  const gameData = await res[matchI].json();
	  const queueId = gameData.queueId;
	  const duration = gameData.duration;
	  if (duration == 0 || queueId == 2000 || queueId == 2010 || queueId == 2020) {
<<<<<<< HEAD
		const mrwTag = document.querySelector(`#match${matchI}-wrapper`);
=======
		const mrwTag = document.querySelector(`#match${i}-wrapper`);
>>>>>>> 19ff79b6c99f90a3d771679597228785ea7ba6ca
		mrwTag.parentNode.removeChild(mrwTag);
		continue;
	  }
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
	  const bestDamageDealt = recentGameData.bestDamageDealt;
	  
      const matchWrapper = $(matchNum);
      matchWrapper.append(recentGameHeader);

	  const userNameBlueTag = $(`${matchNum} > div > .participants > .blue`);
	  const userNameRedTag = $(`${matchNum} > div > .participants > .red`);
	  userNameBlueTag.append(userNameBlue);
	  userNameRedTag.append(userNameRed);

	  const showGameMainDiv = $(`${matchNum} > div > .show-game-main`);
	  const showGameMainBtn = `<button id="show-game-main-btn${matchI}" class="show-game-main-btn"><i class="fa-solid fa-angle-down"></i></i></button>`;
	  showGameMainDiv.append(showGameMainBtn);

	  const showGameMainBtnr = $(`#show-game-main-btn${matchI}`);
	  const showRecentGameMain = `#recent-game-main${matchI}`;
	  const showGameMainIcon = $(`#show-game-main-btn${matchI}`);


	  showGameMainBtnr.click(function() {
		if ($(showRecentGameMain).attr('class') == 'recent-game-main-hide') {
		  $(showRecentGameMain).attr('class', 'recent-game-main')
		  showGameMainIcon.css('transform', 'rotate(180deg)')
		} else {
		  $(showRecentGameMain).attr('class', 'recent-game-main-hide')
		  showGameMainIcon.css('transform', 'rotate(360deg)')
		}
	  })
	  
	  let gameResultEnTop;
	  let gameResultKoTop;
	  let gameResultEnBottom;
	  let gameResultKoBottom;
	  let topTeam;
	  let bottomTeam;
	  let topTotalKills;
	  let bottomTotalKills;
	  let participantsTop;
	  let participantsBottom;
	  
	  if (topTeamId == 100) { 
		topTeam = '블루팀';
		topTotalKills = blueTotalKills;
		bottomTeam = '레드팀';
		bottomTotalKills = redTotalKills;
		participantsTop = participantsBlue;
		participantsBottom = participantsRed;
	  }
	  else { 
	    topTeam = '레드팀';
		topTotalKills = redTotalKills;
		bottomTeam = '블루팀';
		bottomTotalKills = blueTotalKills;
		participantsTop = participantsRed;
		participantsBottom = participantsBlue;
	  }

	  if (duration < 300) {
		gameResultEnTop = 'REMAKE';
		gameResultKoTop = '';
		gameResultEnBottom = 'REMAKE';
		gameResultKoBottom = '';
	  }
	  else if (blueTeamWin == true) {
		gameResultEnTop = 'WIN';
		gameResultKoTop = '승리';
		gameResultEnBottom = 'LOSE';
		gameResultKoBottom = '패배';
	  }
	  else {
		gameResultEnBottom = 'WIN';
		gameResultKoBottom = '승리';
		gameResultEnTop = 'LOSE';
	    gameResultKoTop = '패배';
	  }

	  const mainRunes = {};

	  for (let i = 0; i < participantsTop.length; i++) {
		mainRunes[`runeTop${i}`] = checkRune(participantsTop[i].rune_main, participantsTop[i].rune_sub)
		if (participantsTop[i].summoner_name == summonerName) participantsTop[i].summonerSpan = `<span id="main_summoner${matchI}"><a href="/summoners/${matchServer}/${participantsTop[i].summoner_name}">${participantsTop[i].summoner_name}</a></span>`
		else participantsTop[i].summonerSpan = `<span><a href="/summoners/${matchServer}/${participantsTop[i].summoner_name}">${participantsTop[i].summoner_name}</a></span>`
	  }

	  for (let i = 0; i < participantsBottom.length; i++) {
		mainRunes[`runeBottom${i}`] = checkRune(participantsBottom[i].rune_main, participantsTop[i].rune_sub)
		if (participantsTop[i].summoner_name == summonerName) participantsBottom[i].summonerSpan = `<span id="main_summoner${matchI}"><a href="/summoners/${matchServer}/${participantsTop[i].summoner_name}">${participantsTop[i].summoner_name}</a></span>`
		else participantsBottom[i].summonerSpan = `<span><a href="/summoners/${matchServer}/${participantsTop[i].summoner_name}">${participantsTop[i].summoner_name}</a></span>`
	  }
		
	  let recentGameMain = ``;
		
	  recentGameMain += `
	    <div id="recent-game-main${matchI}" class="recent-game-main-hide">
	      <div id="result-top"  result="${gameResultEnTop}">
	  		<div class="main-header">
			  <div class="main-header-result" style="width: 26%;"><span class="result">${gameResultKoTop}</span> (${topTeam})</div>
			  <div class="main-header-kda" style="width: 15%;">KDA</div>
			  <div class="main-header-damage" style="width: 19%;">딜량</div>
			  <div class="main-header-cs" style="width: 11%;">CS</div>
			  <div class="main-header-item" style="width: 29%;">아이템</div>
			</div>
			<ul>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[0].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsTop[0].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[0].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[0].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop0[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeTop0[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
<<<<<<< HEAD
				  ${participantsTop[0].summonerSpan}
=======
	  			  <span><a href="/summoners/${matchServer}/${participantsTop[0].summoner_name}">${participantsTop[0].summoner_name}</a></span>
				  <span></span>
>>>>>>> 19ff79b6c99f90a3d771679597228785ea7ba6ca
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsTop[0].kills}</span>
				    /
				    <span class="main-deaths">${participantsTop[0].deaths}</span>
				    /
				    <span class="main-assists">${participantsTop[0].assists}</span>
				    <span>(${getFloatFixed(((participantsTop[0].kills+participantsTop[0].assists)/topTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsTop[0].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsTop[0].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsTop[0].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsTop[0].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsTop[0].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsTop[0].item0}
				    </div>
				    <div class="item1">
					  ${participantsTop[0].item1}
				    </div>
					<div class="item2">
					  ${participantsTop[0].item2}
					</div>
					<div class="item3">
					  ${participantsTop[0].item3}
					</div>
					<div class="item4">
					  ${participantsTop[0].item4}
					</div>
					<div class="item5">
					  ${participantsTop[0].item5}
					</div>
					<div class="item6">
					  ${participantsTop[0].item6}
					</div>
				  </div>
				</div>
			  </li>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[1].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsTop[1].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[1].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[1].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop1[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeTop1[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsTop[1].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsTop[1].kills}</span>
				    /
				    <span class="main-deaths">${participantsTop[1].deaths}</span>
				    /
				    <span class="main-assists">${participantsTop[1].assists}</span>
				    <span>(${getFloatFixed(((participantsTop[1].kills+participantsTop[1].assists)/topTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsTop[1].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsTop[1].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsTop[1].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsTop[1].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsTop[1].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsTop[1].item0}
				    </div>
				    <div class="item1">
					  ${participantsTop[1].item1}
				    </div>
					<div class="item2">
					  ${participantsTop[1].item2}
					</div>
					<div class="item3">
					  ${participantsTop[1].item3}
					</div>
					<div class="item4">
					  ${participantsTop[1].item4}
					</div>
					<div class="item5">
					  ${participantsTop[1].item5}
					</div>
					<div class="item6">
					  ${participantsTop[1].item6}
					</div>
				  </div>
				</div>
			  </li>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[2].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsTop[2].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[2].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[2].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop2[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeTop2[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsTop[2].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsTop[2].kills}</span>
				    /
				    <span class="main-deaths">${participantsTop[2].deaths}</span>
				    /
				    <span class="main-assists">${participantsTop[2].assists}</span>
				    <span>(${getFloatFixed(((participantsTop[2].kills+participantsTop[2].assists)/topTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsTop[2].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsTop[2].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsTop[2].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsTop[2].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsTop[2].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsTop[2].item0}
				    </div>
				    <div class="item1">
					  ${participantsTop[2].item1}
				    </div>
					<div class="item2">
					  ${participantsTop[2].item2}
					</div>
					<div class="item3">
					  ${participantsTop[2].item3}
					</div>
					<div class="item4">
					  ${participantsTop[2].item4}
					</div>
					<div class="item5">
					  ${participantsTop[2].item5}
					</div>
					<div class="item6">
					  ${participantsTop[2].item6}
					</div>
				  </div>
				</div>
			  </li>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[3].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsTop[3].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[3].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[3].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop3[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeTop3[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsTop[3].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsTop[3].kills}</span>
				    /
				    <span class="main-deaths">${participantsTop[3].deaths}</span>
				    /
				    <span class="main-assists">${participantsTop[3].assists}</span>
				    <span>(${getFloatFixed(((participantsTop[3].kills+participantsTop[3].assists)/topTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsTop[3].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsTop[3].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsTop[3].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsTop[3].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsTop[3].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsTop[3].item0}
				    </div>
				    <div class="item1">
					  ${participantsTop[3].item1}
				    </div>
					<div class="item2">
					  ${participantsTop[3].item2}
					</div>
					<div class="item3">
					  ${participantsTop[3].item3}
					</div>
					<div class="item4">
					  ${participantsTop[3].item4}
					</div>
					<div class="item5">
					  ${participantsTop[3].item5}
					</div>
					<div class="item6">
					  ${participantsTop[3].item6}
					</div>
				  </div>
				</div>
			  </li>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsTop[4].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsTop[4].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[4].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsTop[4].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeTop4[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeTop4[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsTop[4].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsTop[4].kills}</span>
				    /
				    <span class="main-deaths">${participantsTop[4].deaths}</span>
				    /
				    <span class="main-assists">${participantsTop[4].assists}</span>
				    <span>(${getFloatFixed(((participantsTop[4].kills+participantsTop[4].assists)/topTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsTop[4].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsTop[4].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsTop[4].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsTop[4].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsTop[4].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsTop[4].item0}
				    </div>
				    <div class="item1">
					  ${participantsTop[4].item1}
				    </div>
					<div class="item2">
					  ${participantsTop[4].item2}
					</div>
					<div class="item3">
					  ${participantsTop[4].item3}
					</div>
					<div class="item4">
					  ${participantsTop[4].item4}
					</div>
					<div class="item5">
					  ${participantsTop[4].item5}
					</div>
					<div class="item6">
					  ${participantsTop[4].item6}
					</div>
				  </div>
				</div>
			  </li>
			</ul>
		  </div>
	      <div id="result-bottom" result="${gameResultEnBottom}">
	  		<div class="main-header">
			  <div class="main-header-result" style="width: 26%;"><span class="result">${gameResultKoBottom}</span> (${bottomTeam})</div>
			  <div class="main-header-kda" style="width: 15%;">KDA</div>
			  <div class="main-header-damage" style="width: 19%;">딜량</div>
			  <div class="main-header-cs" style="width: 11%;">CS</div>
			  <div class="main-header-item" style="width: 29%;">아이템</div>
			</div>
			<ul>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[0].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsBottom[0].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[0].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[0].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom0[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeBottom0[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsBottom[0].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsBottom[0].kills}</span>
				    /
				    <span class="main-deaths">${participantsBottom[0].deaths}</span>
				    /
				    <span class="main-assists">${participantsBottom[0].assists}</span>
				    <span>(${getFloatFixed(((participantsBottom[0].kills+participantsBottom[0].assists)/bottomTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsBottom[0].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsBottom[0].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsBottom[0].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsBottom[0].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsBottom[0].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsBottom[0].item0}
				    </div>
				    <div class="item1">
					  ${participantsBottom[0].item1}
				    </div>
					<div class="item2">
					  ${participantsBottom[0].item2}
					</div>
					<div class="item3">
					  ${participantsBottom[0].item3}
					</div>
					<div class="item4">
					  ${participantsBottom[0].item4}
					</div>
					<div class="item5">
					  ${participantsBottom[0].item5}
					</div>
					<div class="item6">
					  ${participantsBottom[0].item6}
					</div>
				  </div>
				</div>
			  </li>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[1].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsBottom[1].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[1].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[1].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom1[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeBottom1[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsBottom[1].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsBottom[1].kills}</span>
				    /
				    <span class="main-deaths">${participantsBottom[1].deaths}</span>
				    /
				    <span class="main-assists">${participantsBottom[1].assists}</span>
				    <span>(${getFloatFixed(((participantsBottom[1].kills+participantsBottom[1].assists)/bottomTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsBottom[1].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsBottom[1].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsBottom[1].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsBottom[1].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsBottom[1].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsBottom[1].item0}
				    </div>
				    <div class="item1">
					  ${participantsBottom[1].item1}
				    </div>
					<div class="item2">
					  ${participantsBottom[1].item2}
					</div>
					<div class="item3">
					  ${participantsBottom[1].item3}
					</div>
					<div class="item4">
					  ${participantsBottom[1].item4}
					</div>
					<div class="item5">
					  ${participantsBottom[1].item5}
					</div>
					<div class="item6">
					  ${participantsBottom[1].item6}
					</div>
				  </div>
				</div>
			  </li>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[2].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsBottom[2].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[2].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[2].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom2[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeBottom2[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsBottom[2].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsBottom[2].kills}</span>
				    /
				    <span class="main-deaths">${participantsBottom[2].deaths}</span>
				    /
				    <span class="main-assists">${participantsBottom[2].assists}</span>
				    <span>(${getFloatFixed(((participantsBottom[2].kills+participantsBottom[2].assists)/bottomTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsBottom[2].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsBottom[2].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsBottom[2].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsBottom[2].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsBottom[2].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsBottom[2].item0}
				    </div>
				    <div class="item1">
					  ${participantsBottom[2].item1}
				    </div>
					<div class="item2">
					  ${participantsBottom[2].item2}
					</div>
					<div class="item3">
					  ${participantsBottom[2].item3}
					</div>
					<div class="item4">
					  ${participantsBottom[2].item4}
					</div>
					<div class="item5">
					  ${participantsBottom[2].item5}
					</div>
					<div class="item6">
					  ${participantsBottom[2].item6}
					</div>
				  </div>
				</div>
			  </li>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[3].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsBottom[3].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[3].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[3].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom3[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeBottom3[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsBottom[3].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsBottom[3].kills}</span>
				    /
				    <span class="main-deaths">${participantsBottom[3].deaths}</span>
				    /
				    <span class="main-assists">${participantsBottom[3].assists}</span>
				    <span>(${getFloatFixed(((participantsBottom[3].kills+participantsBottom[3].assists)/bottomTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsBottom[3].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsBottom[3].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsBottom[3].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsBottom[3].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsBottom[3].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsBottom[3].item0}
				    </div>
				    <div class="item1">
					  ${participantsBottom[3].item1}
				    </div>
					<div class="item2">
					  ${participantsBottom[3].item2}
					</div>
					<div class="item3">
					  ${participantsBottom[3].item3}
					</div>
					<div class="item4">
					  ${participantsBottom[3].item4}
					</div>
					<div class="item5">
					  ${participantsBottom[3].item5}
					</div>
					<div class="item6">
					  ${participantsBottom[3].item6}
					</div>
				  </div>
				</div>
			  </li>
			  <li>
				<div class="main-icon">
				  <img src="${RIOTCDNURI}/${latestVersion}/img/champion/${checkChamp(participantsBottom[4].champ_key)[1]}.png" width="32" height="32">
				  <span class="main-champ-level">${participantsBottom[4].champ_level}</span>
				</div>
				<div class="main-spells">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[4].spell1]}.png" width="16" height="16">
	  			  <img src="${RIOTCDNURI}/${latestVersion}/img/spell/${SPELL[participantsBottom[4].spell2]}.png" width="16" height="16">
				</div>
				<div class="main-runes">
				  <img class="rune-top" src="${RIOTCDNURI}/img/${mainRunes.runeBottom4[0][0]}" width="16" height="16">
				  <img src="${RIOTCDNURI}/img/${mainRunes.runeBottom4[1][0]}" width="16" height="16">
				</div>
				<div class="main-name">
	  			  ${participantsBottom[4].summonerSpan}
				</div>
				<div class="main-kda">
				  <div class="main-k-d-a">
				    <span class="main-kills">${participantsBottom[4].kills}</span>
				    /
				    <span class="main-deaths">${participantsBottom[4].deaths}</span>
				    /
				    <span class="main-assists">${participantsBottom[4].assists}</span>
				    <span>(${getFloatFixed(((participantsBottom[4].kills+participantsBottom[4].assists)/bottomTotalKills) * 100, 0)}%)</span>
				  </div>
				  <div class="main-kda-ratio">
				    <span class="main-ratio">${participantsBottom[4].kda}</span>
				  </div>
				</div>
				<div class="main-damage">
	  			  <div class="dealt">${participantsBottom[4].damage_dealt}</div>
				  <div class="blank"></div>
				  <div class="progress">
				    <div class="fill" style="width: ${getFloatFixed((participantsBottom[4].damage_dealt/bestDamageDealt) * 100, 0)}%"></div>
				  </div>
				</div>
				<div class="main-cs">
	  			  <div class="cs">${participantsBottom[4].minions_killed}</div>
				  <div class="blank"></div>
				  <div class="main-min-cs">분당 ${participantsBottom[4].min_minions_killed}</div>
				</div>
				<div class="main-item">
				  <div class="items">
				    <div class="item0">
					  ${participantsBottom[4].item0}
				    </div>
				    <div class="item1">
					  ${participantsBottom[4].item1}
				    </div>
					<div class="item2">
					  ${participantsBottom[4].item2}
					</div>
					<div class="item3">
					  ${participantsBottom[4].item3}
					</div>
					<div class="item4">
					  ${participantsBottom[4].item4}
					</div>
					<div class="item5">
					  ${participantsBottom[4].item5}
					</div>
					<div class="item6">
					  ${participantsBottom[4].item6}
					</div>
				  </div>
				</div>
			  </li>
			</ul>
		  </div>
		</div>`;

	  const recentGameWrapper = $(`#match${matchI}-wrapper`);
	  recentGameWrapper.append(recentGameMain);
	  recentGameWrapper.css('width', '100%');
	
	  const kills = Number($(`${matchNum} > div > .info > .kda > .k-d-a > .kills`).text());
	  const assists = Number($(`${matchNum} > div > .info > .kda > .k-d-a > .assists`).text());
	  
	  const teamId = $(`${matchNum} > div > .info > .stats > .p-kill`);
	  if (teamId.attr('teamid') == 100) teamId.html(` 킬관여 <span>${getFloatFixed(((kills+assists)/blueTotalKills) * 100, 0)}%</span>`);
	  else teamId.html(` 킬관여 <span>${getFloatFixed(((kills+assists)/redTotalKills) * 100, 0)}%</span>`);
		
	  const gameTypeText = $(`${matchNum} > div > .game > .type`);
<<<<<<< HEAD
	  const gameResultText = $(`#recent-game-main${matchI} > div > div > div > .result`);
      const gameResult = $(`${matchNum} > div`).attr('result');
	  const gameResult2 = $(`#recent-game-main${matchI} > div`).attr('result');
	  const recentGameMainUl = $(`#recent-game-main${matchI} > div > ul`);
	  const recentGameMainTopItemImg = $(`#recent-game-main${matchI} > #result-top > ul > li > div > .items > div > img`);
	  const recentGameMainTopItemDiv = $(`#recent-game-main${matchI} > #result-top > ul > li > div > .items > div > div`);
	  const recentGameMainBottomItemImg = $(`#recent-game-main${matchI} > #result-bottom > ul > li > div > .items > div > img`);
	  const recentGameMainBottomItemDiv = $(`#recent-game-main${matchI} > #result-bottom > ul > li > div > .items > div > div`);

	  if (gameResult == 'Remake') {
		matchWrapper.css('background', '#282830');
		$(`#match-${matchI} > .recent-game-header > .show-game-main`).css('background', '#1C1C1F');
		$(`#match-${matchI} > div > .info > .items > div > img`).css('background', '#515163');
		$(`#match-${matchI} > div > .info > .items > div > div`).css('background', '#515163');
=======
	  const gameResultText = $(`#recent-game-main${i} > div > div > div > .result`);
      const gameResult = $(`${matchNum} > div`).attr('result');
	  const gameResult2 = $(`#recent-game-main${i} > div`).attr('result');
	  const recentGameMainUl = $(`#recent-game-main${i} > div > ul`);
	  const recentGameMainTopItemImg = $(`#recent-game-main${i} > #result-top > ul > li > div > .items > div > img`);
	  const recentGameMainTopItemDiv = $(`#recent-game-main${i} > #result-top > ul > li > div > .items > div > div`);
	  const recentGameMainBottomItemImg = $(`#recent-game-main${i} > #result-bottom > ul > li > div > .items > div > img`);
	  const recentGameMainBottomItemDiv = $(`#recent-game-main${i} > #result-bottom > ul > li > div > .items > div > div`);

	  if (gameResult == 'Remake') {
		matchWrapper.css('background', '#282830');
		$(`#match-${i} > .recent-game-header > .show-game-main`).css('background', '#1C1C1F');
		$(`#match-${i} > div > .info > .items > div > img`).css('background', '#515163');
		$(`#match-${i} > div > .info > .items > div > div`).css('background', '#515163');
>>>>>>> 19ff79b6c99f90a3d771679597228785ea7ba6ca
		gameTypeText.css('color', '#F5F5F5');
	  }
      else if (gameResult == 'WIN') {
		matchWrapper.css('background', '#28344E');
<<<<<<< HEAD
		$(`#match-${matchI} > .recent-game-header > .show-game-main`).css('background', '#2F436E');
		$(`#match-${matchI} > div > .info > .items > div > img`).css('background', '#2F436E');
		$(`#match-${matchI} > div > .info > .items > div > div`).css('background', '#2F436E');
=======
		$(`#match-${i} > .recent-game-header > .show-game-main`).css('background', '#2F436E');
		$(`#match-${i} > div > .info > .items > div > img`).css('background', '#2F436E');
		$(`#match-${i} > div > .info > .items > div > div`).css('background', '#2F436E');
>>>>>>> 19ff79b6c99f90a3d771679597228785ea7ba6ca
		gameTypeText.css('color', '#408FFF');
	  }
      else {
		matchWrapper.css('background', '#59343B');
<<<<<<< HEAD
		$(`#match-${matchI} > .recent-game-header > .show-game-main`).css('background', '#703C47');
		$(`#match-${matchI} > div > .info > .items > div > img`).css('background', '#703C47');
		$(`#match-${matchI} > div > .info > .items > div > div`).css('background', '#703C47');
		gameTypeText.css('color', '#cc0000');
	  }

=======
		$(`#match-${i} > .recent-game-header > .show-game-main`).css('background', '#703C47');
		$(`#match-${i} > div > .info > .items > div > img`).css('background', '#703C47');
		$(`#match-${i} > div > .info > .items > div > div`).css('background', '#703C47');
		gameTypeText.css('color', '#cc0000');
	  }

	  console.log(gameResult2);

>>>>>>> 19ff79b6c99f90a3d771679597228785ea7ba6ca
	  if (gameResult2 == 'REMAKE') {
		recentGameMainUl[0].style.background = '#1E1E24';
		recentGameMainUl[1].style.background = '#1E1E24';
		recentGameMainTopItemImg.css('background', '#515163');
		recentGameMainTopItemDiv.css('background', '#515163');
		recentGameMainBottomItemImg.css('background', '#515163');
		recentGameMainBottomItemDiv.css('background', '#515163');
	  }
      else if (gameResult2 == 'WIN') {
		recentGameMainUl[0].style.background = '#28344E';
		recentGameMainUl[1].style.background = '#59343B';
		gameResultText[0].style.color = '#408FFF';
		gameResultText[1].style.color = '#cc0000';
		recentGameMainTopItemImg.css('background', '#2F436E');
		recentGameMainTopItemDiv.css('background', '#2F436E');
		recentGameMainBottomItemImg.css('background', '#703C47');
		recentGameMainBottomItemDiv.css('background', '#703C47');
	  }
      else {
		recentGameMainUl[0].style.background = '#59343B';
		recentGameMainUl[1].style.background = '#28344E';
		gameResultText[0].style.color = '#cc0000';
		gameResultText[1].style.color = '#408FFF';
		recentGameMainTopItemImg.css('background', '#703C47');
		recentGameMainTopItemDiv.css('background', '#703C47');
		recentGameMainBottomItemImg.css('background', '#2F436E');
		recentGameMainBottomItemDiv.css('background', '#2F436E');
	  }

	//   밝은 파랑 #E7EFFF
	//   파랑 사이드 #C1D0F2
	//   파랑 메인 #CCDBFF
	
	//   밝은 레드 #FFEEF0
	//   레드 사이드 #FECFD1
	//   레드 메인 #FECFD1

	//    다시하기 #F5F5F8
	//    사이드   #E6EAEE
	//     메인    #E6EAEE

	  const mainSummoner = $(`#main_summoner${matchI}`);
	  const mainSummonerParent = mainSummoner.parent().parent();

	  console.log(mainSummonerParent.parent().css('background-color'))

	  if (mainSummonerParent.parent().css('background-color') == 'rgb(89, 52, 59)') mainSummonerParent.css('background', '#5C2D37');
	  else if (mainSummonerParent.parent().css('background-color') == 'rgb(30, 30, 36)') mainSummonerParent.css('background', '#151518');
	  else mainSummonerParent.css('background', '#24355B');

	  const multiKill = $(`${matchNum} > div > .info > .kda > .multi_kill`);
	  if (multiKill.attr('result')) multiKill.css('font-size', '12px').css('width', '62px').css('height', '26px')
		  .css('background', '#8B0000').css('margin-top', '12px').css('text-align', 'center').css('display', 'flex')
		  .css('justify-content', 'center').css('align-items', 'center').css('border-radius', '1em');
    }

	const checkMrwTag = document.querySelector('.matchrecord__right');
	const loadingDiv = document.querySelector('#div_load_image');

	checkMrwTag.removeChild(loadingDiv)
	
	const noMatchDiv = document.createElement('div')
	noMatchDiv.className = 'no-match-record';
	noMatchDiv.innerHTML = '<i class="fa-regular fa-circle-xmark"></i><span class="no-match">기록된 전적이 없습니다.</span>';

	if (checkMrwTag.childNodes.length == 1) checkMrwTag.insertBefore(noMatchDiv, checkMrwTag.firstChild);
	const noMatchRecord = document.querySelector('.no-match-record');
	if (themeCookie == 'dark' && noMatchRecord) noMatchRecord.style.color = '#F5F5F5';

	$('.match-wrapper').show();
  });

function recentGame(gameData, summonerName) {
  const gameType = ko[QUEUETYPE[gameData.queueId]];
  const gameEndTime = timeForToday(gameData.start_time + gameData.duration * 1000);
  const gameDuration = `${Math.floor(gameData.duration/60)}분 ${(gameData.duration % 60).toString().padStart(2,'0')}초`;
  const blueTeamWin = gameData.team100_win;
  const redTeamWin = gameData.team200_win;

  let checkRemake = false;
  let blueTotalKills = 0;
  let redTotalKills = 0;
  let bestDamageDealt = 0;
  let recentGameHeader = ``;
  let participantsData = {participantsBlue:[], participantsRed:[], topTeamId:'', blueTeamWin, redTeamWin};
  let userNameBlue = ``;
  let userNameRed = ``;

  if (gameData.duration < 300) {
	checkRemake = true;
  }

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
    const runes = checkRune(participants.rune_main, participants.rune_sub);
    const runeMainSrc = `${RIOTCDNURI}/img/${runes[0][0]}`;
    const runeSubSrc = `${RIOTCDNURI}/img/${runes[1][0]}`;
    const kills = participants.kills;
    const deaths = participants.deaths;
    const assists = participants.assists;
	const damageDealt = participants.damage_dealt;
    const minionsKilled = participants.minions_killed;
    const minMinionsKilled = getFloatFixed(minionsKilled/(gameData.duration/60), 1);
    const visionWards = participants.vision_wards_bought;
    const teamId = participants.team_id;
	const largestMultiKill = participants.largest_multi_kill;
    let kda = `${participants.kda}:1`;
	let multiKill = '';
	
	let kdaColor;
	if (kda < 3) kdaColor = '#808080';
	else kdaColor = ''

	if (bestDamageDealt < damageDealt) bestDamageDealt = damageDealt;
	  
	if (largestMultiKill == 2) multiKill = '더블 킬';
	else if (largestMultiKill == 3) multiKill = '트리플 킬';
	else if (largestMultiKill == 4) multiKill = '쿼드라 킬';
	else if (largestMultiKill == 5) multiKill = '펜타 킬';
	  
    let gameResultEn;
    let gameResultKo;

	if (checkRemake) {
	  gameResultEn = 'Remake';
	  gameResultKo = '다시하기';
	}
    else if (gameResult == 1) {
      gameResultEn = 'WIN';
      gameResultKo = '승리';
    } 
	else {
      gameResultEn = 'LOSE';
      gameResultKo = '패배';
    }

    let itemTag = [];

	for(let i=0; i<7; i++) {
	  const item = participants[`item${i}`];
	  if (item != 0) itemTag.push(`<img src="${itemUri}/${item}.png" width="26" height="26" alt="item0">`);
	  else itemTag.push(`<div class="item0"></div>`);

	  participants[`item${i}`] = itemTag[i];
	}
	
    if (deaths == 0) { 
	  kda = 'Perpect';
	  participants.kda = 'Perpect';
	} else participants.kda = kda;

	participants.min_minions_killed = minMinionsKilled;

	let runeTag = ``;

	if (runes[0][1] && runes[1][0]) {
	  runeTag = `
	  <img class="rune_main" src="${runeMainSrc}" width="26" height="26" alt="${runes[0][1]}">
	  <img class="rune_sub" src="${runeSubSrc}" width="26" height="26" alt="${runes[1][1]}">`;
	} else if (runes[0][1]) {
	  runeTag = `
	  <img class="rune_main" src="${runeMainSrc}" width="26" height="26" alt="${runes[0][1]}">
	  <div class="rune_sub"></div>`;
	} else {
	  runeTag = `
	  <div class="rune_main"></div>
	  <img class="rune_sub" src="${runeSubSrc}" width="26" height="26">`;
	}

	let checkSummonerName = false;

    if (pSummonerName == summonerName) {
	  participantsData.topTeamId = teamId;
	  checkSummonerName = true;

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
				  ${runeTag}
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
                <span class="ratio">${kda}</span>
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
                ${itemTag[0]}
              </div>
              <div class="item1">
                ${itemTag[1]}
              </div>
              <div class="item2">
                ${itemTag[2]}
              </div>
              <div class="item3">
                ${itemTag[3]}
              </div>
              <div class="item4">
                ${itemTag[4]}
              </div>
              <div class="item5">
                ${itemTag[5]}
              </div>
              <div class="item6">
                ${itemTag[6]}
              </div>
            </div>
          </div>
		  <div class="participants"><ul class="blue"></ul><ul class="red"></ul></div>
		  <div class="show-game-main"></div>
        </div>`;
    }

	if (teamId == 100) {
	  blueTotalKills += kills;
	  participantsData.participantsBlue.push(participants);
	  if (checkSummonerName) userNameBlue += `<li><div class="p-icon"><img src="${champImgSrc}" weight="16" height="16" alt="${champNameId[1]}"></div><a style="font-weight: bold;" href="/summoners/${matchServer}/${pSummonerName}">${pSummonerName}</a></li>`;
	  else userNameBlue += `<li><div class="p-icon"><img src="${champImgSrc}" weight="16" height="16" alt="${champNameId[1]}"></div><a href="/summoners/${matchServer}/${pSummonerName}">${pSummonerName}</a></li>`;
	}
    else {
	  redTotalKills += kills;
	  participantsData.participantsRed.push(participants);
	  if (checkSummonerName) userNameRed += `<li><div class="p-icon"><img src="${champImgSrc}" weight="16" height="16" alt="${champNameId[1]}"></div><a style="font-weight: bold;" href="/summoners/${matchServer}/${pSummonerName}">${pSummonerName}</a></li>`;
	  else userNameRed += `<li><div class="p-icon"><img src="${champImgSrc}" weight="16" height="16" alt="${champNameId[1]}"></div><a href="/summoners/${matchServer}/${pSummonerName}">${pSummonerName}</a></li>`;
	}
  }
  return { recentGameHeader, participantsData, userNameBlue, userNameRed, 
		blueTotalKills, redTotalKills, bestDamageDealt}
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
      if (data.id == rune1) {
        rune1Icon = data.icon;
        rune1Name = data.name;
      }
    })
  }

  RUNE.forEach(data => {
    runeId = data.id;
    runeIcon = data.icon;
    runeName = data.name;

	const slotRunes = data.slots[0].runes;

	for (const slotRune of slotRunes) {
	  if (slotRune.id == rune1) {
		rune1Icon = slotRune.icon;
		rune1Name = slotRune.name;
		break;
	  }
	}
	
    if (runeId == rune2) {
      rune2Icon = runeIcon;
      rune2Name = runeName;
    }

  })
  return [[rune1Icon, rune1Name], [rune2Icon, rune2Name]];
}