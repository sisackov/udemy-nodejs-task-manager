// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');
// const MongoClient = mongodb.MongoClient; //client that runs db operations

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!');
        }
        // console.log('Connected to database!');

        const db = client.db(databaseName);

        // db.collection('users').insertOne(
        //     {
        //         // _id: id,
        //         // name: 'Vikram',
        //         name: 'Stas',
        //         age: 37,
        //     },
        //     (error, result) => {
        //         if (error) {
        //             return console.log('Unable to insert user');
        //         }
        //         console.log(result.ops);
        //     }
        // );

        // db.collection('users').insertMany(
        //     [
        //         {
        //             name: 'Jen',
        //             age: 28,
        //         },
        //         {
        //             name: 'Gunther',
        //             age: 27,
        //         },
        //     ],
        //     (error, result) => {
        //         if (error) {
        //             return console.log('Unable to insert documents!');
        //         }

        //         console.log(result.ops);
        //     }
        // );

        // db.collection('tasks').insertMany(
        //     [
        //         {
        //             description: 'Clean the house',
        //             completed: true,
        //         },
        //         {
        //             description: 'Renew inspection',
        //             completed: false,
        //         },
        //         {
        //             description: 'Pot plants',
        //             completed: false,
        //         },
        //     ],
        //     (error, result) => {
        //         if (error) {
        //             return console.log('Unable to insert tasks!');
        //         }

        //         console.log(result.ops);
        //     }
        // );

        // db.collection('users').findOne(
        //     { _id: new ObjectID('61e3425ba526b809c01add9b') },
        //     (error, user) => {
        //         if (error) {
        //             return console.log('Unable to fetch');
        //         }

        //         console.log(user);
        //     }
        // );

        db.collection('users')
            .find({ age: 37 })
            .toArray((error, users) => {
                console.log(users);
            });

        // db.collection('tasks').findOne(
        //     { _id: new ObjectID('5c0fec243ef6bdfbe1d62e2f') },
        //     (error, task) => {
        //         console.log(task);
        //     }
        // );

        // db.collection('tasks')
        //     .find({ completed: false })
        //     .toArray((error, tasks) => {
        //         console.log(tasks);
        //     });
    }
);
