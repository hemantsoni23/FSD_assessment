const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Data', DataSchema);
