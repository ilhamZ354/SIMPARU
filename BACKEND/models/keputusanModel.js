const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keputusanSchema = new Schema({
    kategori: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    keputusan: {
        type: String,
        required: true
    },
},
  {
    timestamps: true
  },
);

module.exports = mongoose.model('Keputusan', keputusanSchema);