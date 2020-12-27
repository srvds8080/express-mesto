const mongoose = require('mongoose');
const { REGEX_URL } = require('../utils/constants');

const ownerSchema = new mongoose.Schema({
  required: true,
  name: {
    type: String,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return REGEX_URL.test(v);
      },
    },
  },
  _id: {
    type: String,
  },
});

module.exports = mongoose.model('owner', ownerSchema);
