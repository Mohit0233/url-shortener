const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: "_id can't be empty",
        unique: true,
    },
    url: {
        type: String,
        required: 'Your password is required',
        min: 6,
        max: 16
    },  

    expiryDate: {
        type: Date,
        required: 'an expiry date is required',
        default: new Date(new Date(new Date().setDate(new Date().getDate() + 30)).setHours(0, 0, 0, 0))
    },

    userId: {
        type: String,
        required: 'user not mentioned'
    },
    
    count: {
        type: Number,
        default: 0
    }

}, {timestamps: true, _id: false });

module.exports = mongoose.model('Url', UrlSchema);