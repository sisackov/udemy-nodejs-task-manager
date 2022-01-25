const app = require('./app');
const port = process.env.PORT;

// const jwt = require('jsonwebtoken');
// const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {
//     expiresIn: '7 days',
// });
// console.log('token', token);
// // const decoded = jwt.verify('w' + token, 'thisismynewcourse');// throws an error
// const decoded = jwt.verify('w' + token, 'thisismynewcourse');
// console.log('decoded', decoded);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// const express = require('express');
// require('./db/mongoose'); //this will load and run the file which will connect to mongoDB
// const userRouter = require('./routers/user');
// const taskRouter = require('./routers/task');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json()); //allows the server to parse json requests
// app.use(userRouter);
// app.use(taskRouter);

// // app.post('/users', async (req, res) => {
// //     const user = new User(req.body);
// //     try {
// //         await user.save();
// //         res.status(201).send(user);
// //     } catch (e) {
// //         res.status(400).send(e);
// //     }
// //     // user.save()
// //     //     .then(() => {
// //     //         res.status(201).send(user);
// //     //     })
// //     //     .catch((error) => {
// //     //         res.status(400).send(error);
// //     //     });
// // });

// // app.get('/users', async (req, res) => {
// //     try {
// //         const users = await User.find({});
// //         res.send(users);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }

// //     // User.find({}) //find all users
// //     //     .then((users) => {
// //     //         res.send(users);
// //     //     })
// //     //     .catch((error) => {
// //     //         res.status(500).send(error);
// //     //     });
// // });

// // app.get('/users/:id', async (req, res) => {
// //     const _id = req.params.id;

// //     try {
// //         const user = await User.findById(_id);
// //         if (!user) {
// //             return res.status(404).send();
// //         }
// //         res.send(user);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }
// //     // User.findById(_id)
// //     //     .then((user) => {
// //     //         if (!user) {
// //     //             return res.status(404).send();
// //     //         }
// //     //         res.send(user);
// //     //     })
// //     //     .catch((error) => {
// //     //         res.status(500).send(error);
// //     //     });
// // });

// // app.patch('/users/:id', async (req, res) => {
// //     const _id = req.params.id;

// //     //below is done because if a field does not exist in the collection, it will not throw an error.
// //     //mongodb will just ignore it. this way we can verify if the field is valid and send an error if it is not
// //     const updates = Object.keys(req.body);
// //     const allowedUpdates = Object.keys(User.schema.paths).filter(
// //         (field) => field.startsWith('_') === false
// //     ); //this will return an array of all the fields in the schema that are not _id, _v, _c, etc.
// //     const isValidOperation = updates.every((update) =>
// //         allowedUpdates.includes(update)
// //     );
// //     if (!isValidOperation) {
// //         return res.status(400).send({ error: 'Invalid updates!' });
// //     }

// //     try {
// //         const user = await User.findByIdAndUpdate(_id, req.body, {
// //             new: true, //this will return the updated user instead of the old one
// //             runValidators: true, //this will run the validators on the updated user
// //         });

// //         if (!user) {
// //             return res.status(404).send();
// //         }

// //         res.send(user);
// //     } catch (error) {
// //         res.status(400).send(error);
// //     }
// // });

// // app.delete('/users/:id', async (req, res) => {
// //     const _id = req.params.id;
// //     try {
// //         const user = await User.findByIdAndDelete(_id);
// //         if (!user) {
// //             return res.status(404).send();
// //         }
// //         res.send(user);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }
// // });

// // app.post('/tasks', async (req, res) => {
// //     const task = new Task(req.body);
// //     try {
// //         await task.save();
// //         res.status(201).send(task);
// //     } catch (e) {
// //         res.status(400).send(e);
// //     }

// //     // task.save()
// //     //     .then(() => {
// //     //         res.status(201).send(task);
// //     //     })
// //     //     .catch((e) => {
// //     //         res.status(400).send(e);
// //     //     });
// // });

// // app.get('/tasks', async (req, res) => {
// //     // Task.find({})
// //     //     .then((tasks) => {
// //     //         res.send(tasks);
// //     //     })
// //     //     .catch((error) => {
// //     //         res.status(500).send(error);
// //     //     });
// //     try {
// //         const tasks = await Task.find({});
// //         res.send(tasks);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }
// // });

// // app.get('/tasks/:id', async (req, res) => {
// //     const _id = req.params.id;
// //     try {
// //         const task = await Task.findById(_id);
// //         if (!task) {
// //             return res.status(404).send();
// //         }
// //         res.send(task);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }

// //     // Task.findById(_id)
// //     //     .then((task) => {
// //     //         if (!task) {
// //     //             return res.status(404).send();
// //     //         }
// //     //         res.send(task);
// //     //     })
// //     //     .catch((error) => {
// //     //         res.status(500).send(error);
// //     //     });
// // });

// // app.patch('/tasks/:id', async (req, res) => {
// //     const _id = req.params.id;
// //     const updates = Object.keys(req.body);
// //     const updatableFields = Object.keys(Task.schema.paths).filter(
// //         (field) => field.startsWith('_') === false
// //     );
// //     const isValidOperation = updates.every((update) =>
// //         updatableFields.includes(update)
// //     );
// //     if (!isValidOperation) {
// //         return res.status(400).send({ error: 'Invalid updates!' });
// //     }

// //     try {
// //         const task = await Task.findByIdAndUpdate(_id, req.body, {
// //             new: true,
// //             runValidators: true,
// //         });
// //         if (!task) {
// //             return res.status(404).send();
// //         }
// //         res.send(task);
// //     } catch (error) {
// //         res.status(400).send(error);
// //     }
// // });

// // app.delete('/tasks/:id', async (req, res) => {
// //     const _id = req.params.id;
// //     try {
// //         const task = await Task.findByIdAndDelete(_id);
// //         if (!task) {
// //             return res.status(404).send();
// //         }
// //         res.send(task);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }
// // });

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     // const task = await Task.findById('5c2e505a3253e18a43e612e6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5c2e4dcb5eac678a23725b5b');
//     console.log(user);
//     if (!user) {
//         await user.populate('tasks').execPopulate();
//         console.log(user.tasks);
//     }
// };

// main();
