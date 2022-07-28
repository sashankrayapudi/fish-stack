const Aquarium = require('../models/aquarium');


module.exports = {
  index,
  update
}


async function index(req, res, next) {
  try {
    const aquarium = await Aquarium.find({userId: req.user._id});
    res.render('aquarium/index', {aquarium, title: 'My Aquarium'})
  } catch (err) {
    next (err);
  }
}

async function update(req, res, next) {
  try {
    const aquarium = await Aquarium.findOne({userId: req.user._id});
    console.log(req.body)
    // aquarium.fishList.push(req.body);
    res.redirect('/aquarium'); 
  } catch (err) {
    next (err);
  }
}
