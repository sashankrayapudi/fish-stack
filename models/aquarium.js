const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aquariumSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  fishList: [{type: Schema.Types.ObjectId, ref: "Fish"}],
}, {
    timestamps: true,
   }
);


module.exports = mongoose.model('Aquarium', aquariumSchema);