const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

// router.patch('/users/:id', async (req, res) => {
//     const _id = req.params.id;

//     //below is done because if a field does not exist in the collection, it will not throw an error.
//     //mongodb will just ignore it. this way we can verify if the field is valid and send an error if it is not
//     const updates = Object.keys(req.body);
//     const allowedUpdates = Object.keys(User.schema.paths).filter(
//         (field) => field.startsWith('_') === false
//     ); //this will return an array of all the fields in the schema that are not _id, _v, _c, etc.
//     const isValidOperation = updates.every((update) =>
//         allowedUpdates.includes(update)
//     );
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' });
//     }

//     try {
//         const user = await User.findByIdAndUpdate(_id, req.body, {
//             new: true, //this will return the updated user instead of the old one
//             runValidators: true, //this will run the validators on the updated user
//         });

//         if (!user) {
//             return res.status(404).send();
//         }

//         res.send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

module.exports = router;
