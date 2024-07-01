const mongoose = require('mongoose');

const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb+srv://shubham:12341234@cluster0.fh7mpep.mongodb.net/kanban';

mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    mobile: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
