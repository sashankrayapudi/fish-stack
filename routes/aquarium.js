var express = require('express');
var router = express.Router();
const aquariumCtrl = require('../controllers/aquarium');
const isLoggedIn = require('../config/auth');



// GET /aquarium
router.get('/', isLoggedIn, aquariumCtrl.index);

// PUT /aquarium/fish/:id
router.put('/fish/:id', isLoggedIn, aquariumCtrl.update);

// PUT /aquarium/:idx
router.put('/:idx', isLoggedIn, aquariumCtrl.updateRemove)



module.exports = router;