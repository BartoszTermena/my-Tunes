const Song = require('../../models/Song')
const qs = require('qs')
const _ = require('lodash')

function getFilters(req, res, next) {
    const availableFilters = Object.keys(Song.schema.paths)
    const filters = qs.parse(req.query)
    const schemaFilters = _.pickBy(filters, (value, key) => availableFilters.indexOf(key) > -1)
    let searchFilter = {}
    if(filters.q) {
        searchFilter = {
            $text: {
                $search: filters.q
            }
        }
    }
    
    req.filters = { ...searchFilter, ...schemaFilters}
    next()
}

module.exports = getFilters;