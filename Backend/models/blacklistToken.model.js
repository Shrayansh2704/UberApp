const mongoose = require('mongoose');
const { create } = require('./user.model');
const e = require('express');

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 172800
    }
});

module.exports = mongoose.model('blacklistToken', blacklistTokenSchema);

