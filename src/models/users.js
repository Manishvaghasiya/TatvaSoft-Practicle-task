const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Blog = require('./blog');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain password text inside');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timeStamps: true
});

userSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user.id
    }, process.env.JWT_SECREAT_KEY);
    user.tokens = user.tokens.concat({
        token
    });
    await user.save();
    return token;
};

userSchema.statics.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    });
    if (!user) {
        throw new Error('Unable to Login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to Login');
    }
    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.pre('remove', async function (next) {
    const user = this;
    // remove all the blogs created by this user
    await Blog.deleteMany({
        owner: user._id
    });
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;