const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date }
});

module.exports = mongoose.model('Profile', profileSchema);