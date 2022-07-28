const Fish = require('../models/fish');
const Aquarium = require('../models/aquarium')

module.exports = {
  index,
  new: newFish,
  create,
  show,
  edit,
  update,
  delete: deleteFish
};



async function index(req, res) {
  //enum: ['goldfish-koi', 'community', 'cichlids', 'specialty']
  const fish = await Fish.find({category: req.query.category});
  res.render('fish/index', {
    fish, 
    category: req.query.category,
    title: `Category: ${req.query.category}`,
  });
};


function newFish(req, res) {
  const validCategories = Fish.schema.path('category').enumValues;
  res.render('fish/new', {title: 'Add New Fish', validCategories});
};


function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  
  if (req.body.compatible) {
    // remove whitespace next to commas
    req.body.compatible = req.body.compatible.replace(/\s*,\s*/g, ',');
    // split by comma
    req.body.compatible = req.body.compatible.split(',');
  }

  req.body.userAdded = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  var fish = new Fish(req.body);
  fish.save(function(err) {
    // one way to handle errors
    if (err) return res.redirect('/fish/new');
    res.redirect(`/fish/${fish._id}`);
  });
};


async function show(req, res) {
  const fish = await Fish.findById(req.params.id);
  res.render('fish/show', {
    fish,
    title: `${fish.name}`,
  });
};


async function edit(req, res) {
  const fish = await Fish.findOne({_id: req.params.id});
  const validCategories = Fish.schema.path('category').enumValues;
  //if (!fish) return res.redirect('/fish');
  res.render('fish/edit', {fish, title: "Update Fish", validCategories});
}


async function update(req, res) {
  const fish = await Fish.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
  res.redirect(`/fish/${fish._id}`);
}


async function deleteFish(req, res, next) {
  try {
    const fish = await Fish.findOneAndDelete({_id: req.params.id});
    if (!fish) throw new Error('Nice Try!');
    res.redirect('/fish')
  } catch(err) {
    next(err);
  }
  
}


// async function addToAquarium(req, res, next) {
//   try {
//     const fish = await Fish.findById(req.params.id);
    
//   }
// }