'use strict';

//서버 리스트
const targetTag = document.querySelector('.country__list');
const countryList = ['KR', 'EUW'];

countryList.forEach(country => {
  const optionCountry = document.createElement('option');
  optionCountry.innerText = country;
  targetTag.appendChild(optionCountry);
})

//아이디 받기
const userName = document.querySelector('.username');
const showRecordBtn = document.querySelector('.show_record_btn');

showRecordBtn.addEventListener('click', () => {
  if (!userName.value) {
    userName.focus()
    return
  }

  const req = {
    username: userName.value,
  };

  fetch('/getRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  // location.href = '/showRecord' 리다이렉트
})