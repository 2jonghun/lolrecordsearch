// const getEncryptedId = async () => {
//   const res = await fetch('/getencryptedId');
//   if (res.status == 200) {
//     const data = await res.json();
//     return data.encryptedId;
//   } else {
//     return new Error('Failed get EncryptedId');
//   }
// }

// const getLeagueId = async () => {
//   const server = getCookie('reqServer');
//   const encryptedId = await getEncryptedId();
//   const res = await fetch(`/getleagueid/${server}/${encryptedId}`);
//   if (res.status == 200) {
//     const data = await res.json();
//     return data;
//   } else {
//     return new Error('Failed get Leaguid');
//   }
// }

// getLeagueId().then(res => {
//   console.log(res);
// })