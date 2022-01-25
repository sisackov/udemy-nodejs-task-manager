const mongoose = require('mongoose');

const CONNECTION_URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'task-manager-api';

// mongoose.connect(`${CONNECTION_URL}/${DATABASE_NAME}`, {
mongoose.connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // according to mongoose 6 docs, useNewUrlParser, useCreateIndex and useUnifiedTopology
    // are no longer supported since Mongoose 6 always behaves as if they're true.
});

//Mongoose will automatically create a collection name from the model name.
// User/Task model will be saved to users/tasks collection.
