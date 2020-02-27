const mongoose = require('mongoose');
const { Schema } = mongoose;
const contactModel = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        email: { type: String },
        mobile: { type: String },
        isfavorite:{type: Boolean}
    }

);
contactModel.set('collection', 'Contacts');
module.exports = mongoose.model('contact', contactModel);

