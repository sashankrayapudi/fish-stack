const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  description: String,
  category: {
    type: String,
    enum: ['goldfish-koi', 'community', 'cichlids', 'specialty']
  },
  compatible: [{type: Schema.Types.ObjectId, ref: 'Fish'}],
  galPerFish: {
    type: Number,
    required: true
  },
  userAdded: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  // Automatic createdAt & updatedAt properties
  timestamps: true
});


module.exports = mongoose.model('Fish', fishSchema);