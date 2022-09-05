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

const themeDarkModeBtn = document.querySelector('#theme-dark');
const themeLightModeBtn = document.querySelector('#theme-light');
const mainContent = document.querySelector('.main__content');
const contentUserProfile = document.querySelector('.content__userprofile');
const profileNameUpdate = document.querySelector('.profile__name__update');
const matchRecord = document.querySelector('.matchrecord');
const loadingImage = document.querySelector('#div_load_image > i');
const moreBtn = document.querySelector('.more');
const mainFooter = document.querySelector('.main__footer');

themeDarkModeBtn.addEventListener('click', () => {
  setCookie('theme', 'light', 30);
  themeDarkModeBtn.className = 'dark-mode-hide';
  themeLightModeBtn.className = 'light-mode';
  mainContent.style.background = '#EBEEF1'
  contentUserProfile.style.background = '#F5F5F5';
  contentUserProfile.style.color = '#31313C';
  matchRecord.style.background = '#F5F5F5';
  const preNoMatchRecord = document.querySelector('.no-match-record');
  if (preNoMatchRecord) preNoMatchRecord.style.color = '#31313C';
  moreBtn.style.border = '1.5px #DADADA solid';
  moreBtn.style.background = '#F3F3F3';
  moreBtn.style.color = '#31313C';
  mainFooter.style.background = '#EAEAEA';
  mainFooter.style.color = '#31313C';
})

themeLightModeBtn.addEventListener('click', () => {
  setCookie('theme', 'dark', 30);
  themeLightModeBtn.className = 'light-mode-hide';
  themeDarkModeBtn.className = 'dark-mode';
  mainContent.style.background = '#1C1C1F';
  contentUserProfile.style.background = '#31313C';
  contentUserProfile.style.color = '#F5F5F5';
  matchRecord.style.background = '#31313C';
  const preNoMatchRecord = document.querySelector('.no-match-record');
  if (preNoMatchRecord) preNoMatchRecord.style.color = '#F5F5F5';
  moreBtn.style.border = '1.5px #1C1C1F solid';
  moreBtn.style.background = '#202124';
  moreBtn.style.color = '#F5F5F5';
  mainFooter.style.background = '#31313C';
  mainFooter.style.color = '#F5F5F5';
})