const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({

    hash: {
        type: String,
        required: "_id can't be empty",
        unique: true,
    },
    url: {
        type: String,
        required: 'can not enter empty url in db',
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

}, {timestamps: true });

module.exports = mongoose.model('Url', UrlSchema);