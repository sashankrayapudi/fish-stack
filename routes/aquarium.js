var express = require('express');
var router = express.Router();
const aquariumCtrl = require('../controllers/aquarium');
const isLoggedIn = require('../config/auth');



// GET /aquarium
router.get('/', aquariumCtrl.index);

// PUT /aquarium/fish/:id
router.put('/fish/:id', aquariumCtrl.update);



module.exports = router;