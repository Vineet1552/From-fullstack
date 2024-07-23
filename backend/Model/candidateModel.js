const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    dob: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;