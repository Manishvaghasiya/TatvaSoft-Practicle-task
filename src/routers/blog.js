const express = require('express');
const Blog = require('../models/blog');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/blogs', auth, async (req, res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user._id
    });
    try {
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/blogs', auth, async (req, res) => {

    const match = {};
    const sort = {};

    if (req.user.role != 'admin') {
        match.owner = req.user._id;
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(',');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {

        const blogs = await Blog.find(match, null, { skip: parseInt(req.query.skip), limit: parseInt(req.query.limit), sort });
        res.send(blogs);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/blogs/me', auth, async (req, res) => {
    const sort = {};
    const match = {};

    match.owner = req.user._id;

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(',');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'blogs',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.blogs);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/blog/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/blog/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/blog/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedTOUpdate = ['title', 'description'];
    const isValidOperation = updates.every((update) => {
        return allowedTOUpdate.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid Updates !'
        });
    }

    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!blog) {
            return res.status(404).send();
        }
        // update logic
        updates.forEach((update) => blog[update] = req.body[update]);
        blog.save();
        res.send(blog);

    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;