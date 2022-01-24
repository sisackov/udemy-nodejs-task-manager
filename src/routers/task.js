const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({});
        // res.send(tasks);
        await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const updatableFields = Object.keys(Task.schema.paths).filter(
        (field) => field.startsWith('_') === false
    );
    const isValidOperation = updates.every((update) =>
        updatableFields.includes(update)
    );
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        // const task = await Task.findByIdAndUpdate(_id, req.body, {
        //     new: true,
        //     runValidators: true,
        // });

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    // const _id = req.params.id;
    try {
        // const task = await Task.findByIdAndDelete(_id);
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
