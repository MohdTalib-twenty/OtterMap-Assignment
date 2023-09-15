const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  userId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  shopName: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

shopSchema.index({ location: '2dsphere' }); // Create a geospatial index

module.exports = mongoose.model('Shop', shopSchema);
