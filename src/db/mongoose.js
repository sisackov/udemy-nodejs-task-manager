const mongoose = require('mongoose');

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
    },
    age: {
        type: Number,
    },
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
});

const me = new User({ name: 'Stas', age: 37 });

// me.save()
//     .then(() => {
//         console.log('saved', me);
//     })
//     .catch((error) => {
//         console.log('error', error);
//     });

const task = new Task({
    description: 'Learn mongoose',
    completed: false,
});

// task.save()
//     .then(() => {
//         console.log(task);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
