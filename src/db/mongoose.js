const mongoose = require('mongoose');
const validator = require('validator');

const CONNECTION_URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'task-manager-api';

mongoose.connect(`${CONNECTION_URL}/${DATABASE_NAME}`, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // according to mongoose 6 docs, useNewUrlParser, useCreateIndex and useUnifiedTopology
    // are no longer supported since Mongoose 6 always behaves as if they're true.
});

//Mongoose will automatically create a collection name from the model name.
// User/Task model will be saved to users/tasks collection.

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

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// const user = new User({ name: 'Mike', email: 'mike@' });//throws validation error
// const user = new User({ name: '  Mike   ', email: 'MIKE@MAIL.ORG    ' }); //trims spaces and lowercases email
const user = new User({
    name: 'Vikram',
    password: 'n98juuyg65fgt',
    email: 'vikram@mail.com',
}); //

// user.save()
//     .then(() => {
//         console.log('saved', user);
//     })
//     .catch((error) => {
//         console.log('error', error);
//     });

const task = new Task({
    description: 'Clean the house',
});

// task.save()
//     .then(() => {
//         console.log(task);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
