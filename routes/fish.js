var express = require('express');
var router = express.Router();
const fishCtrl = require('../controllers/fish');


// GET /fish
router.get('/', fishCtrl.index);


module.exports = router;