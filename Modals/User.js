const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, // ✅ Fixed: changed from 'string' to 'String'
        required: true,
    },
    email: {
        type: String, // ✅ Fixed
        required: true,
        unique: true
    },
    password: {
        type: String, // ✅ Fixed
        required: true,
    }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
