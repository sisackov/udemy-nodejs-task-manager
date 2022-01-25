const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            },
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a postive number');
                }
            },
        },
        tokens: [
            //each object will have an id property because it is considered a subdocument
            //tokens is an array to store multiple tokens and allow the user to log in
            //from multiple devices
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        avatar: {
            type: Buffer,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

//methods are available on the instance of the model
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    /**
     * tokens can be temporary or permanent.
     * to define a temporary token, we need to set the expiresIn property.
     * sign method arguments:
     * The first argument is the payload, which is the data we want to encode.
     * The second argument is the secret key which is just a series of characters.
     * The third argument is the options.
     * The options object has a property called expiresIn which tells the token to expire in a certain time.
     * The token is then returned.
     * The token has 3 parts: header.payload.signature(separated by a period).
     * The header and the payload are encoded in base64.
     * The signature is a hash(algorithm defined in the header)
     * of the header+payload+secret key from the second argument.
     * e.g.: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
     */
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );

    //concat merges the arrays and returns a new array as opposed
    //to push which is mutating the original array
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

//statics are available on the model(instance not needed)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
