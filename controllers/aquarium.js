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
    let isCompatible = true;
    aquarium.fishList.forEach(function(fish){
      minGal += fish.galPerFish;
    })
    // Time: O(n^2)
    for (let i = 0; i < aquarium.fishList.length; i++) {
      let validFish = aquarium.fishList[i].compatible;
      console.log(validFish)
      let fishListCopy = [...aquarium.fishList]
      console.log(fishListCopy)
      fishListCopy.splice(i,1)
      for (let i = 0; i < fishListCopy.length; i++) {
        // console.log(isCompatible)
        if (!(validFish.includes(fishListCopy[i]._id))) {
          isCompatible = false;
          break;
        }
      }
    }
    res.render('aquarium/index', {
      aquarium,
      title: 'My Aquarium',
      minGal,
      isCompatible
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
