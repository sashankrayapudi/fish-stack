const Aquarium = require('../models/aquarium');
const Fish = require('../models/fish')


module.exports = {
  index,
  update,
  updateRemove
}


async function index(req, res, next) {
  try {
    const aquarium = await Aquarium.findOne({userId: req.user._id}).populate('fishList');
    let minGal = 0;
    let compatible = true;
    aquarium.fishList.forEach(function(fish){
      minGal += fish.galPerFish;
    })
    for (let i = 0; i < aquarium.fishList.length; i++) {
      const validFish = aquarium.fishList[i].compatible;
      for (let i = 0; i < aquarium.fishList.length; i++) {
        if (!(validFish.includes(aquarium.fishList[i]))) {
          compatible = false;
          break;
        }
      }
    }
    res.render('aquarium/index', {
      aquarium,
      title: 'My Aquarium',
      minGal,
      compatible
    })
  } catch (err) {
    next (err);
  }
}

async function update(req, res, next) {
  try {
    const aquarium = await Aquarium.findOne({userId: req.user._id}).populate('fishList');
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


async function updateRemove(req, res, next) {
  try {
    const aquarium = await Aquarium.findOne({userId: req.user._id}).populate('fishList');
    aquarium.fishList.splice(req.params.idx, 1);
    aquarium.save();
    res.redirect('/aquarium');
  } catch (err) {
    next(err)
  }
}
