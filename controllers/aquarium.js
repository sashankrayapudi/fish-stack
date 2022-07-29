const Aquarium = require('../models/aquarium');
const Fish = require('../models/fish')


module.exports = {
  index,
  update
}


async function index(req, res, next) {
  try {
    const aquarium = await Aquarium.find({userId: req.user._id}).populate('fishList').exec();
    res.render('aquarium/index', {
      aquarium,
      title: 'My Aquarium',
      inside: aquarium.fishList
    })
  } catch (err) {
    next (err);
  }
}

async function update(req, res, next) {
  try {
    const aquarium = await Aquarium.findOne({userId: req.user._id}).populate('fishList').exec();
    const fish = await Fish.findOne({_id: req.params.id});
    for (let i = 0; i < req.body.quantity; i++) {
      aquarium.fishList.push(fish);
    }
    aquarium.save();
    res.redirect('/aquarium'); 
  } catch (err) {
    next (err);
  }
}
