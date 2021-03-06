const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs')
const mongoPagination = require('mongo-cursor-pagination')
const Schema = mongoose.Schema

const SongSchema = new Schema({
    title: {
        type: String,
        required: true
        },
    genre: {
        type: String,
        required: true
        },
    createdBy: {
        type: String,
        required: true
        }
    },
    {
        timestamps: true
})
SongSchema.index({ title: 'text' })

SongSchema.plugin(URLSlugs('title', { field: 'slug', update: true }))
SongSchema.plugin(mongoPagination.mongoosePlugin);
module.exports = Song = mongoose.model('song', SongSchema);
