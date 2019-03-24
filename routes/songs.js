const express = require('express');
const router = express.Router();
const Song = require('../models/Song')
const getFilters = require('../middleware/filters/songs')

router.get('/:slug', async (req, res, next) => {
    try {
        const song = await Song.findOne({ slug: req.params.slug });
        if (!song) return next();
        return res.status(200).send({ data: song })
    } catch (e) {
        res.status(404).send({ message: err });
    }
})

router.get('/', getFilters, async (req, res) => {
    try {
        let sort_by = {}
        sort_by[req.query.sort_by || 'createdAt'] = req.query.order_by || 'desc';
        if (req.query.q) sort_by = { score: { $meta: 'textScore' } }
        const offset = parseInt(req.query.offset) || 0;
        const per_page = parseInt(req.query.per_page) || 2;
        const songsPromise = 
            Song.find(req.filters, { score: {$meta: 'textScore' } })
            .skip(offset)
            .limit(per_page)
            .sort(sort_by);
        const countPromise = Song.count(req.filters)
        const [songs, count] = await Promise.all([songsPromise, countPromise])
        
        return res.status(200).send( { data: songs, count } );
    } catch (e) {
        res.status(404).send({ message: err });
    }
})

router.post('/', async (req, res) => {
    try {
        const newSong = await new Song({
            title: req.body.title,
            genre: req.body.genre,
            createdBy: req.body.createdBy
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
