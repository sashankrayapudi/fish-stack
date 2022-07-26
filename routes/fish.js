var express = require('express');
var router = express.Router();
const fishCtrl = require('../controllers/fish');


// GET /fish
router.get('/', fishCtrl.index);

// GET /fish/new
router.get('/new', fishCtrl.new)

// GET /fish/show
router.get('/:id', fishCtrl.show)

// POST /fish
router.get('/', fishCtrl.create)

module.exports = router;