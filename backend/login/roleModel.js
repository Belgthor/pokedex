const mongoose = require('mongoose')
const { Schema } = mongoose

const roleSchema = Schema({
    name: String
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role