const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fishSchema = new Schema({
  name: String,
  image: String,
  description: String,
  category: {
    type: String,
    enum: ['goldfish-koi', 'community', 'cichlids', 'specialty']
  },
  compatible: [String],
  galPerFish: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  // Automatic createdAt & updatedAt properties
  timestamps: true
});


module.exports = mongoose.model('Fish', fishSchema);