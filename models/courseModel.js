const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
});

module.exports = mongoose.model('courses', courseSchema);
