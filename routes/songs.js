const express = require('express');
const router = express.Router();
const Song = require('../models/Song')

router.get('/:slug', async (req, res, next) => {
    try {
        const song = await Song.findOne({ slug: req.params.slug });
        if (!song) return next();
        return res.status(200).send({ data: song })
    } catch (e) {
        res.status(404).send({ message: err });
    }
})

router.get('/', async (req, res) => {
    try {
        const songsPromise = Song.paginate({
            limit: req.query.per_page || 2,
            previous: req.query.previous || null,
            next: req.query.next || null
        });
        const countPromise = Song.count()
        const [songs, count] = await Promise.all([songsPromise, countPromise])
        
        const links = {};
        if (songs.hasNext) {
            links.next = `${req.protocol}://${req.get('host')}${req.path}?next=${songs.next}`;
        }
        if (songs.hasPrevious) {
            links.previous = `${req.protocol}://${req.get('host')}${req.path}?previous=${songs.previous}`;
        }
        res.links(links);
        res.set('total-count', count);
        return res.status(200).send( songs.results );
    } catch (e) {
        res.status(404).send({ message: err });
    }
})

router.post('/', async (req, res) => {
    try {
        const newSong = await new Song({
            title: req.body.title
        }).save();
        return res.status(201).send({ data: newSong, message: 'Song was created'})
    } catch (e) {
        res.status(404).send({ message: err });
    }
})

router.delete('/:slug', async (req, res) => {
    try {
        const song = await Song.findOne({slug: req.params.slug });
        if (!song) return next();
        const removePromise = await song.remove();
        return res.status(200).send({ data: removePromise, message: 'Song was removed'})
    } catch (e) {
        res.status(404).send({ message: err });
    }
})
module.exports = router;
