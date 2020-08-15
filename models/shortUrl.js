const mongoose = require('mongoose');
const shortId = require('shortid');

const Schema = mongoose.Schema;

const shortUrl = new Schema({

    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        require: true,
        default: shortId.generate
    },
    clicks:{
        type: Number,
        require: true,
        default: 0
    }
})

const shorturl = mongoose.model('shorturl',shortUrl);

module.exports = shorturl;