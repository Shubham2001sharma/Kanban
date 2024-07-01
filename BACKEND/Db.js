const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kanban_app', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email uniqueness
        //isFirstLogin: { type: Boolean, default: true }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female','transgender'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        match: /^\d{10}$/ // Assuming a 10-digit mobile number
    }
});

const User = mongoose.model('User', schema);

module.exports = User;
