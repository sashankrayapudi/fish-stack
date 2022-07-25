const Fish = require('../models/fish');

module.exports = {
  index
};

async function index(req, res) {
  //enum: ['goldfish-koi', 'community', 'cichlids', 'specialty']
  const fish = await Fish.find({category: req.query.category});
  res.render('fish/index', {
    fish, 
    category: req.query.category,
    title: `Fish for ${req.query.category.toUpperCase()}`
  });
}
