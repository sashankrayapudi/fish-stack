const Fish = require('../models/fish');

module.exports = {
  index,
  new: newFish,
  create,
  show
};



async function show(req, res) {
  const fish = await Fish.findById(req.params.id);
  res.render('fish/show', {
    fish,
    title: `Fish`
  });
}

function create(req, res) {
  // remove whitespace next to commas
  req.body.compatible = req.body.compatible.replace(/\s*,\s*/g, ',');
  // split if it's not an empty string
  if (req.body.compatible) req.body.compatible = req.body.compatible.split(',');
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var fish = new Fish(req.body);
  fish.save(function(err) {
    // one way to handle errors
    if (err) return res.redirect('/fish/new');
    res.redirect(`/fish/${fish._id}`);
  });
}


function newFish(req, res) {
  const validCategories = Fish.schema.path('category').enumValues;
  res.render('fish/new', {title: 'Add New Fish', validCategories});
}


async function index(req, res) {
  //enum: ['goldfish-koi', 'community', 'cichlids', 'specialty']
  const fish = await Fish.find({category: req.query.category});
  res.render('fish/index', {
    fish, 
    category: req.query.category,
    title: `Fish for ${req.query.category.toUpperCase()}`
  });
}
