const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');  // renderiza views/index.pug
});

router.get('/login', (req, res) => {
  res.render('login');  // renderiza views/login.pug
});

module.exports = router;