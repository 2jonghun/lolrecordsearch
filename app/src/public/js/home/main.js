'use strict';
//아이디 받기
const userName = document.querySelector('.username');
const reqServer = document.querySelector('.server__list');
const showRecordBtn = document.querySelector('.show_record_btn');

userName.addEventListener('keydown', event => {
  if (event.keyCode == 13) {
    event.preventDefault();
    showRecordBtn.click();
  }
});

showRecordBtn.addEventListener('click', () => {
  if (!userName.value) {
    userName.focus();
    return
  }

  location.href = `/summoners/${reqServer.value}/${userName.value}`;
});