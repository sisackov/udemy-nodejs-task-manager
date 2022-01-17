const mongoose = require('mongoose');

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

// const task = new Task({
//     description: 'Clean the house',
// });

// task.save()
//     .then(() => {
//         console.log(task);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

module.exports = Task;
