const Fish = require('../models/fish');
const Aquarium = require('../models/aquarium')

module.exports = {
  index,
  new: newFish,
  create,
  show,
  edit,
  update,
  delete: deleteFish,
  addToCompatible,
  removeFromCompatible
};



async function index(req, res) {
  //enum: ['goldfish-koi', 'community', 'cichlids', 'specialty']
  if (req.query.category === undefined) {
    var fishs = await Fish.find({});
  } else {
    var fishs = await Fish.find({category: req.query.category});
  }

  res.render('fish/index', {
    fishs, 
    category: req.query.category,
    title: `Category: ${req.query.category}`,
  });
};


function newFish(req, res) {
  const validCategories = Fish.schema.path('category').enumValues;
  res.render('fish/new', {title: 'Add a New Fish', validCategories});
};


function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  

  if (req.body.compatible) req.body.compatible = req.body.compatible.replace(/\s*,\s*/g, ',');
  // split by comma
  if (req.body.compatible) req.body.compatible = req.body.compatible.split(',');


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
  try {
    const fish = await Fish.findById(req.params.id).populate('compatible');
    const allFish = await Fish.find({_id: {$nin: fish.compatible}});
    console.log(allFish);
    res.render('fish/show', {
    fish,
    allFish,
    title: `${fish.name}`,
  });
  } catch (err) {
    next (err)
  }
};

// function show(req, res) {
//   Fish.findById(req.params.id)
//     .populate('compatible')
//     .exec(function(err, fish) {
//       Fish.find(
//         {_id: {$nin: fish.compatible}},
//         function(err, compatibleFish) {
//           res.render('fish/show', {
//             title: `${fish.name}`,
//             compatibleFish,
//             fish
//           });
//         }
//       );
//     });
// }


async function edit(req, res) {
  const fish = await Fish.findOne({_id: req.params.id, userAdded: req.user._id});
  const allFish = await Fish.find({_id: {$nin: fish.compatible}});
  const validCategories = Fish.schema.path('category').enumValues;
  if (!fish) return res.redirect('/fish');
  res.render('fish/edit', {fish, title: "Update Fish", validCategories, allFish});
}


async function update(req, res, next) {
  try {
    const fish = await Fish.findOneAndUpdate({_id: req.params.id, userAdded: req.user._id}, req.body, {new: true});
    res.redirect(`/fish/${fish._id}`);
  } catch (err) {
    next (err)
  }
}



async function deleteFish(req, res, next) {
  try {
    console.log(req.user._id)
    const fish = await Fish.findOneAndDelete({_id: req.params.id, userAdded: req.user._id});
    // if (!fish) throw new Error('Nice Try!');
    res.redirect('/fish')
  } catch(err) {
    next(err);
  }
  
}


async function addToCompatible(req, res, next) {
  try {
    const fish = await Fish.findById(req.params.id);
    fish.compatible.push(req.body.fishId)
    // console.log(fish.compatible)
    fish.save();
    res.redirect(`/fish/${fish._id}`);
  } catch (err) {
    next (err)
  }
}

async function removeFromCompatible(req, res, next) {
  try {
    console.log(req.params.id)
    const fish = await Fish.findById(req.params.id);
    console.log(req.params.idx)
    fish.compatible.splice(req.params.idx,1)
    fish.save()
    res.redirect(`/fish/${fish._id}`);
  } catch (err) {
    next (err)
  }
}