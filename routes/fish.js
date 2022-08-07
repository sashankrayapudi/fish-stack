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
router.get('/:id/edit', isLoggedIn, fishCtrl.edit)

// PUT /fish/:id (update the fish)
router.put('/:id', isLoggedIn, fishCtrl.update);

// DELETE /fish/:id (delete the fish)
router.delete('/:id', isLoggedIn, fishCtrl.delete)

// PUT /fish/:id/allFish
router.put('/:id/allFish', isLoggedIn, fishCtrl.addToCompatible);

// PUT /fish/:id/:idx
router.put('/:id/:idx', isLoggedIn, fishCtrl.removeFromCompatible);

// POST /fish
router.post('/', isLoggedIn, fishCtrl.create)

module.exports = router;