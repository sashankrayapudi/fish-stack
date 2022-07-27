var express = require('express');
var router = express.Router();
const fishCtrl = require('../controllers/fish');
const isLoggedIn = require('../config/auth');


// GET /fish
router.get('/', fishCtrl.index);

// GET /fish/new
router.get('/new', isLoggedIn, fishCtrl.new)

// GET /fish/:id
router.get('/:id', fishCtrl.show)

// GET /fish/:id/edit (edit page)
//router.get('/:id/edit', fishCtrl.edit)

// POST /fish
router.post('/', isLoggedIn, fishCtrl.create)

module.exports = router;