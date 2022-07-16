'use strict';

//서버 리스트
const targetTag = document.querySelector('.server__list');
const serverList = ['KR', 'BR1', 'JP1', 'LA1', 'LA2', 'NA1', 'OC1', 'RU', 'TR1', 'EUN1', 'EUW1'];

serverList.forEach(server => {
  const optionServer = document.createElement('option');
  optionServer.value = server.toLowerCase();
  if (!(server === 'KR' | server === 'RU')) {
    optionServer.innerText = server.replace('1', '');
  } else {
    optionServer.innerText = server;
  }
  targetTag.appendChild(optionServer);
})

//아이디 받기
const userName = document.querySelector('.username');
const reqServer = document.querySelector('.server__list');
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