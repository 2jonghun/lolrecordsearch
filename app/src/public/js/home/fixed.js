const RIOTCDNURI = 'https://ddragon.leagueoflegends.com/cdn/';

let latestVersion = '12.13.1';
let CHAMPION;

getVersion();

async function getVersion() {
  const res = await fetch('/get/version');
  if (res.status == 200) {
    const version = await res.text();
    latestVersion = version;
    console.log(latestVersion);
  }
}

getChampion();

async function getChampion() {
  const res = await fetch('/get/championjson');
  if (res.status == 200) {
    const champions = await res.json();
    CHAMPION = champions
    console.log(CHAMPION);
  }
}

const QUEUETYPE = {
  400: 'norm', //Normal Draft Pick
  420: 'solo',
  430: 'norm',
  440: 'flex',
  450: 'aram',
  700: 'clash',
  800: 'ai',  // Deprecated
  810: 'ai',  // Deprecated
  820: 'ai',  // Deprecated
  830: 'ai',
  840: 'ai',
  850: 'ai',
  900: 'urf',
  920: 'poro',
  1020: 'ofa',
  1300: 'nbg',
  1400: 'usb', // Ultimate Spellbook
  2000: 'tut',
  2010: 'tut',
  2020: 'tut',
}

const ko = {
  "solo": "솔랭",
	"norm": "일반",
	"aram": "칼바람",
	"flex": "자랭",
	"nbg": "돌넥",
	"usb": "궁주문서",
	"urf": "URF",
	"ofa": "단일",
	"ai": "AI대전",
	"poro": "포로왕",
	"tut": "튜토리얼",
	"etc": "기타",
	"clash": "격전"
}

function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
      return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}