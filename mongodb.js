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
        console.log(db);

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

        // db.collection('users')
        //     .find({ age: 37 }) //returns a cursor object that has many methods(https://mongodb.github.io/node-mongodb-native/3.6/api/Cursor.html)
        //     // .toArray((error, users) => {
        //     .toArray((_, users) => {
        //         //underscore variable means we don't use it
        //         console.log(users);
        //     });

        // db.collection('tasks').findOne(
        //     { _id: new ObjectId('61e342f39a82af4e34ef99d7') },
        //     (error, task) => {
        //         console.log(task);
        //     }
        // );

        // db.collection('tasks')
        //     .find({ completed: false })
        //     .toArray((error, tasks) => {
        //         console.log(tasks);
        //     });

        // db.collection('users')
        //     .updateOne(
        //         {
        //             _id: new ObjectID('61e3425ba526b809c01add9c'),
        //         },
        //         {
        //             $inc: {
        //                 age: 1,
        //             },
        //         }
        //     )
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // db.collection('tasks')
        //     .updateMany(
        //         {
        //             completed: false,
        //         },
        //         {
        //             $set: {
        //                 completed: true,
        //             },
        //         }
        //     )
        //     .then((result) => {
        //         console.log(result.modifiedCount);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // db.collection('users').deleteMany({
        //     age: 27
        // }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })

        // db.collection('tasks')
        //     .deleteOne({
        //         description: 'Clean the house',
        //     })
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }
);
