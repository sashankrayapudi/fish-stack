var express = require('express');
var router = express.Router();
const fishCtrl = require('../controllers/fish');
const isLoggedIn = require('../config/auth');


// GET /fish
router.get('/', fishCtrl.index);

// GET /fish/new
router.get('/new', isLoggedIn, fishCtrl.new)

// GET /fish/show
router.get('/:id', fishCtrl.show)

// POST /fish
router.post('/', isLoggedIn, fishCtrl.create)

module.exports = router;