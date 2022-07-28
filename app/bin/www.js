'use strict';

// const riotdata = require('../src/models/riotdata');
// const RIOTDATA = new riotdata();
// RIOTDATA.initialize();

const app = require('../app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('서버 가동', '포트:', PORT);
});

// module.exports = RIOTDATA;