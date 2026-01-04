const mongoose = require('mongoose')
const { Schema } = mongoose
const trainerSchema = Schema({
    name: {type: String},
    shiny: {type: Boolean},
    perfect: {type: Boolean},
    lucky: {type: Boolean},
    xxl: {type: Boolean},
    xxs: {type: Boolean},
    mega: {type: Boolean},
    dmax: {type: Boolean},
    gmax: {type: Boolean},
    shadow: {type: Boolean},
    purified: {type: Boolean},
    maleHundo: {type: Boolean},
    femaleHundo: {type: Boolean},
    unknownHundo: {type: Boolean},
    costume: {type: Boolean},
},
{ _id : false })
const pokemonSchema = Schema({
    dex: {type: Number, required: true},
    dexGroup: {type: String},
    name: {type: String, required: true, uppercase: true},
    candy: {type: String, required: true, uppercase: true},
    region: {
        type: String, 
        required: true, 
        uppercase: true, 
        enum : ['KANTO','JOHTO','HOENN','SINNOH','UNOVA','KALOS','ALOLA','GALAR','HISUI','PALDEA','UNIDENTIFIED']
    },
    evolution: {type: Number},
    male: {type: Boolean},
    female: {type: Boolean},
    trade: {type: Boolean},
    release: {type: Boolean},
    releaseShiny: {type: Boolean},
    releaseDate: {type: Date},
    releaseShinyDate: {type: Date},
    form: {type: String},
    formName: {type: String},
    formNumber: {type: Number},
    costume: {type: String},
    costumeName: {type: String},
    costumeNumber:  {type: Number},
    image: {type: String},
    imageShiny: {type: String},
    mainDex: {type: Boolean},
    shinyDex: {type: Boolean},
    perfectDex: {type: Boolean},
    luckyDex: {type: Boolean},
    xxlDex: {type: Boolean},
    xxsDex: {type: Boolean},
    shadowDex: {type: Boolean},
    purifiedDex: {type: Boolean},
    megaDex: {type: Boolean},
    gmaxDex: {type: Boolean},
    shadow: {type: Boolean},
    dmax: {type: Boolean},
    mega: {type: Boolean},
    trainer: {
        type: [ trainerSchema ],
        default: []
    }
})

const Pokemon = mongoose.model('pokemon', pokemonSchema)

module.exports = Pokemon