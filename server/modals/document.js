const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin',
        required: true
    },
    accessibility: {
        type: String,
        enum: ['public', 'private']
    },
    editors: [{
        type: String,
    }],
    viewers: [{
        type: String,
    }],
    content: {
        type: String
    }
});

module.exports = mongoose.model('Document', DocumentSchema);