const summonerName = document.querySelector('.summonerName').innerText;
document.title = `${summonerName} - 전적 - LoL Record`;
const soloRankTier = document.querySelector('.solo-tier');
const soloRankTierText = soloRankTier.innerText.split(' ')[0]
// if (soloRankTierText == 'GOLD') soloRankTier.style.color = 'black';

const itemUri = 'https://ddragon.bangingheads.net/cdn/latest/img/item';

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
	  const queueId = gameData.queueId;
	  if (gameData.duration == 0 || queueId == 2000 || queueId == 2010 || queueId == 2020) {
		const mrwTag = document.querySelector(`#match${i}-wrapper`);
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
	  const showGameMainBtn = `<button id="show-game-main-btn${i}" class="show-game-main-btn"><i class="fa-solid fa-angle-down"></i></i></button>`;
	  showGameMainDiv.append(showGameMainBtn);

	  $(`#show-game-main-btn${i}`).click(function() {
		const recentGameMain = `#recent-game-main${i}`;
		const showGameMainIcon = $(`#show-game-main-btn${i}`);
		if ($(recentGameMain).attr('class') == 'recent-game-main-hide') {
		  $(recentGameMain).attr('class', 'recent-game-main')
		  showGameMainIcon.css('transform', 'rotate(180deg)')
		} else {
		  $(recentGameMain).attr('class', 'recent-game-main-hide')
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
	  let topTotalDamageDealt;
	  let bottomTotalDamageDealt;
	  let participantsTop;
	  let participantsBottom;
	  
	  if (topTeamId == 100) { 
		topTeam = '블루팀';
		topTotalKills = blueTotalKills;
		bottomTeam = '레드팀';
		bottomTotalKills = redTotalKills;
		participantsTop = participantsBlue;
		participantsBottom = participantsRed;

		if (blueTeamWin == true) {
		  gameResultEnTop = 'WIN';
		  gameResultKoTop = '승리';
		  gameResultEnBottom = 'LOSE';
		  gameResultKoBottom = '패배';
		} else {
		  gameResultEnBottom = 'WIN';
		  gameResultKoBottom = '승리';
		  gameResultEnTop = 'LOSE';
		  gameResultKoTop = '패배';
		}
	  }
	  else { 
	    topTeam = '레드팀';
		topTotalKills = redTotalKills;
		bottomTeam = '블루팀';
		bottomTotalKills = blueTotalKills;
		participantsTop = participantsRed;
		participantsBottom = participantsBlue;

		if (redTeamWin == true) {
		  gameResultEnTop = 'WIN';
		  gameResultKoTop = '승리';
		  gameResultEnBottom = 'LOSE';
		  gameResultKoBottom = '패배';
		} else {
		  gameResultEnBottom = 'WIN';
		  gameResultKoBottom = '승리';
		  gameResultEnTop = 'LOSE';
		  gameResultKoTop = '패배';
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
	    <div id="recent-game-main${i}" class="recent-game-main-hide">
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
	  			  <span><a href="/summoners/${matchServer}/${participantsTop[0].summoner_name}">${participantsTop[0].summoner_name}</a></span>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsTop[1].summoner_name}">${participantsTop[1].summoner_name}</a></span>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsTop[2].summoner_name}">${participantsTop[2].summoner_name}</a></span>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsTop[3].summoner_name}">${participantsTop[3].summoner_name}</a></span>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsTop[4].summoner_name}">${participantsTop[4].summoner_name}</a></span>
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
			  <div class="main-header-result" style="width: 26%;"><span class="result">${gameResultKoTop}</span> (${topTeam})</div>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsBottom[0].summoner_name}">${participantsBottom[0].summoner_name}</a></span>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsBottom[1].summoner_name}">${participantsBottom[1].summoner_name}</a></span>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsBottom[2].summoner_name}">${participantsBottom[2].summoner_name}</a></span>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsBottom[3].summoner_name}">${participantsBottom[3].summoner_name}</a></span>
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
	  			  <span><a href="/summoners/${matchServer}/${participantsBottom[4].summoner_name}">${participantsBottom[4].summoner_name}</a></span>
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

	  const recentGameWrapper = $(`#match${i}-wrapper`);
	  recentGameWrapper.append(recentGameMain);
	  recentGameWrapper.css('width', '100%');
	
	  const kills = Number($(`${matchNum} > div > .info > .kda > .k-d-a > .kills`).text());
	  const assists = Number($(`${matchNum} > div > .info > .kda > .k-d-a > .assists`).text());
	  
	  const teamId = $(`${matchNum} > div > .info > .stats > .p-kill`);
	  if (teamId.attr('teamid') == 100) teamId.html(` 킬관여 <span>${getFloatFixed(((kills+assists)/blueTotalKills) * 100, 0)}%</span>`);
	  else teamId.html(` 킬관여 <span>${getFloatFixed(((kills+assists)/redTotalKills) * 100, 0)}%</span>`);
		
	  const gameResultText = $(`${matchNum} > div > .game > .result`);
	  const gameResultText2 = $(`#recent-game-main${i} > div > div > div > .result`);
      const gameResult = $(`${matchNum} > div`).attr('result');
	  const gameResult2 = $(`#recent-game-main${i} > div`).attr('result');

	  const recentGameMainUl = $(`#recent-game-main${i} > div > ul`);

      if (gameResult == 'WIN') {
		matchWrapper.css('background', '#28344E');
		$(`#match-${i} > .recent-game-header > .show-game-main`).css('background', '#2F436E');
		gameResultText.css('color', '#408FFF');
	  }
      else {
		matchWrapper.css('background', '#59343B');
		$(`#match-${i} > .recent-game-header > .show-game-main`).css('background', '#703C47');
		gameResultText.css('color', '#cc0000');
	  }

      if (gameResult2 == 'WIN') {
		recentGameMainUl[0].style.background = '#28344E';
		recentGameMainUl[1].style.background = '#59343B';
		gameResultText2[0].style.color = '#408FFF';
		gameResultText2[1].style.color = '#cc0000';
	  }
      else {
		recentGameMainUl[0].style.background = '#59343B';
		recentGameMainUl[1].style.background = '#2F436E';
		gameResultText2[0].style.color = '#cc0000';
		gameResultText2[1].style.color = '#408FFF';
	  }

	  const multiKill = $(`${matchNum} > div > .info > .kda > .multi_kill`);
	  if (multiKill.attr('result')) multiKill.css('font-size', '12px').css('width', '62px').css('height', '26px')
		  .css('background', '#8B0000').css('margin-top', '12px').css('text-align', 'center').css('display', 'flex')
		  .css('justify-content', 'center').css('align-items', 'center').css('border-radius', '1em');
    }
	$("#div_load_image").hide();
	const checkMrwTag = document.querySelector('.matchrecord__right');
	if (!checkMrwTag.hasChildNodes()) {
	  checkMrwTag.innerHTML = `
	  	<div class="no-match-record">
		  <i class="fa-regular fa-circle-xmark"></i>
		  <span class="no-match">
		    기록된 전적이 없습니다.
		  </span>
		</div>`;
	}
	$('.match-record-wrapper').show();
  });

function recentGame(gameData, summonerName) {
  const gameType = ko[QUEUETYPE[gameData.queueId]];
  const gameEndTime = timeForToday(gameData.start_time + gameData.duration * 1000);
  const gameDuration = `${Math.floor(gameData.duration/60)}분 ${(gameData.duration % 60).toString().padStart(2,'0')}초`;
  const blueTeamWin = gameData.team100_win;
  const redTeamWin = gameData.team200_win;

  let blueTotalKills = 0;
  let redTotalKills = 0;
  let bestDamageDealt = 0;
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
	const largestMultiKill = participants.largestMultiKill;
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
    if (gameResult == 1) {
      gameResultEn = 'WIN';
      gameResultKo = '승리';
    } else {
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