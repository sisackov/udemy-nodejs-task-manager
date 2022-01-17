const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
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
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        },
    },
});

// const user = new User({ name: 'Mike', email: 'mike@' });//throws validation error
// const user = new User({ name: '  Mike   ', email: 'MIKE@MAIL.ORG    ' }); //trims spaces and lowercases email
// const user = new User({
//     name: 'Vikram',
//     password: 'n98juuyg65fgt',
//     email: 'vikram@mail.com',
// }); //

// user.save()
//     .then(() => {
//         console.log('saved', user);
//     })
//     .catch((error) => {
//         console.log('error', error);
//     });

module.exports = User;
