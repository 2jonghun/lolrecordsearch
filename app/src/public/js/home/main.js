'use strict';

//서버 리스트
const targetTag = document.querySelector('.country__list');
const countryList = ['KR', 'BR1', 'JP1', 'LA1', 'LA2', 'NA1', 'OC1', 'RU', 'TR1', 'EUN1', 'EUW1'];

countryList.forEach(country => {
  const optionCountry = document.createElement('option');
  optionCountry.value = country.toLowerCase();
  if (!(country === 'KR' | country === 'RU')) {
    optionCountry.innerText = country.replace('1', '');
  } else {
    optionCountry.innerText = country;
  }
  targetTag.appendChild(optionCountry);
})

//아이디 받기
const userName = document.querySelector('.username');
const reqServer = document.querySelector('.country__list');
const showRecordBtn = document.querySelector('.show_record_btn');

showRecordBtn.addEventListener('click', () => {
  if (!userName.value) {
    userName.focus()
    return
  }

  const req = {
    username: userName.value,
    reqServer: reqServer.value,
  };

  location.href = `/showRecord/${req.reqServer}/${req.username}`
})