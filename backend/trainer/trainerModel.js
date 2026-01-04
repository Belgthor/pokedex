const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
    email: {type: String },
    name: {type: String, required: true },
    password: {type: String, required: true},
    roles:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
})

const Trainer = mongoose.model('trainer', trainerSchema)

module.exports = Trainer