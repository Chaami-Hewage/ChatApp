const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Check if the model already exists
if (mongoose.connection && mongoose.connection.models.User) {
    module.exports = mongoose.connection.models.User;
} else {
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
    }, {
        timestamps: true,
    });

    userSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };

    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) {
            next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });

    const User = mongoose.model('User', userSchema);
    module.exports = User;
}
