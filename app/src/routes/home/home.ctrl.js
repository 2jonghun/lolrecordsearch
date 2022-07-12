'use strict';

const output = {
  home: (req, res) => {
    res.render('home/index');
  },

  showRecord: (req, res) => {
    // 
  }
}

const process = {
  getRecord: (req, res) => {
    console.log(req.body);
  }
}

module.exports = {
  output,
  process,
}