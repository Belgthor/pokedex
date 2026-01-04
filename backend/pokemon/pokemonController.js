const Pokemon = require('./pokemonModel')
const Trainer = require('../trainer/trainerModel')
const regions = ['KANTO', 'JOHTO', 'HOENN', 'SINNOH', 'UNOVA', 'KALOS', 'ALOLA', 'GALAR', 'HISUI', 'PALDEA', 'UNIDENTIFIED']

function regionFix(region){
    if(region == 'filter'){
        region = {$nin: ['ALOLA','GALAR','HISUI','PALDEA']}
        regionText = '!alola&!galar&!hisui&!paldea'
    }else{
        region = region.toUpperCase()
        regionText = region.toString()
        region = {$in:[region]}
    }
    return {region: region,regionText: regionText}
}

async function pokemonHave (trainer, gender, region){
    var filter = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: trainer},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: trainer},unknownHundo: true}}}]}
        ]
    }
    const pokemonHave = await Pokemon.find(filter, '-_id dex')
        .sort({dex: 1})
    return [...new Set(pokemonHave.map(item => item.dex))]

}

async function pokemonWant(trainer, gender, region){
    var filter = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: trainer},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: trainer}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: trainer},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: trainer}}]}]}
        ]
    }
    const pokemonWant = await Pokemon.find(filter, '-_id dexGroup')
        .sort({dex: 1})
    const pokemonWantUnique = [...new Set(pokemonWant.map(item => item.dexGroup))]
    const pokemonWantSplit = []
    pokemonWantUnique.forEach(element => {
        const subStrings = element.split(',');
        if(subStrings.length == 1){
            pokemonWantSplit.push(Number(subStrings[0]))
        }else{
            subStrings.forEach(x => {
                pokemonWantSplit.push(Number(x))
            })
        }
    });
    return [...new Set(pokemonWantSplit.map(item => item))]
}

exports.getPokemonAll = async (req, res) => {
    const pokemon = await Pokemon.aggregate()
        .match({})
        .sort({dex: 1, tempRelease: 1})
    res.send(pokemon)
}

exports.getPokemonMain = async (req, res) => {
    const pokemon = await Pokemon.aggregate()
        .match({
            mainDex: true
        })
        .sort({dex: 1})
        .group({
            _id: '$region',
            pokemon: {'$push': '$$ROOT'}
        })
        .addFields({
            sortKey: {
                $let: {
                    vars: { regions: regions },
                    in: { $indexOfArray: ['$$regions', '$_id'] }
                }
            }
        })
        .sort({
            sortKey: 1
        })
    res.send(pokemon)
}

exports.getPokemonShiny = async (req, res) => {
    const pokemon = await Pokemon.aggregate()
        .match({
            shinyDex: true
        })
        .sort({dex: 1,formNumber: 1})
        .group({
            _id: '$region',
            pokemon: {'$push': '$$ROOT'}
        })
        .addFields({
            sortKey: {$indexOfArray: [regions, '$_id']}
        })
        .sort({
            sortKey: 1
        })
    res.send(pokemon)
}

exports.getPokemonLucky = async (req, res) => {
    const pokemon = await Pokemon.aggregate()
        .match({
            luckyDex: true
        })
        .sort({dex: 1})
        .group({
            _id: '$region',
            pokemon: {'$push': '$$ROOT'}
        })
        .addFields({
            sortKey: {$indexOfArray: [regions, '$_id']}
        })
        .sort({
            sortKey: 1
        })
    res.send(pokemon)
}

exports.getPokemonXXL = async (req, res) => {
    const pokemon = await Pokemon.aggregate()
        .match({
            xxlDex: true
        })
        .sort({dex: 1})
        .group({
            _id: '$region',
            pokemon: {'$push': '$$ROOT'}
        })
        .addFields({
            sortKey: {$indexOfArray: [regions, '$_id']}
        })
        .sort({
            sortKey: 1
        })
    res.send(pokemon)
}

exports.getPokemonXXS = async (req, res) => {
    const pokemon = await Pokemon.aggregate()
        .match({
            xxsDex: true,
        })
        .sort({dex: 1})
        .group({
            _id: '$region',
            pokemon: {'$push': '$$ROOT'}
        })
        .addFields({
            sortKey: {$indexOfArray: [regions, '$_id']}
        })
        .sort({
            sortKey: 1
        })
    res.send(pokemon)
}
exports.getTrainerCostume = async (req, res) => {
    if(req.param){console.log('getTrainerCostume-params: ' + JSON.stringify(req.params))}
    if(req.query){console.log('getTrainerCostume-query: ' + JSON.stringify(req.query))}
    if(req.body){console.log('getTrainerCostume-body: ' + JSON.stringify(req.body))}
    try {
        const pokemon = await Pokemon.aggregate()
            .match({
                shadow: { $in: [ null, false ] },
                costumeName: { $ne: null }
                // dmax: { $nin: [ true ] },
                // megaDex: { $nin: [ true ] },
                // gmaxDex: { $nin: [ true ] }
            })
            .sort({dex: 1, costumeNumber: 1})
            .group({
                _id: '$region',
                pokemon: {'$push': '$$ROOT'}
            })
            .addFields({
                sortKey: {$indexOfArray: [regions, '$_id']}
            })
            .sort({
                sortKey: 1
            })
        res.send(pokemon)
    } catch (error) {
        res.status(500).send({ error })
    }
}
exports.getTrainerHundo = async (req, res) => {
    if(req.param){console.log('hundoList: ' + JSON.stringify(req.params))}
    if(req.query){console.log('hundoList: ' + JSON.stringify(req.query))}
    if(req.body){console.log('hundoList: ' + JSON.stringify(req.body))}
    try {
        const pokemon = await Pokemon.aggregate()
            .match({
                shadow: { $nin: [ true ] },
                costumeName: { $exists:false },
                dmax: { $nin: [ true ] },
                megaDex: { $nin: [ true ] },
                gmaxDex: { $nin: [ true ] }
            })
            .sort({dex: 1, formName: 1})
            .group({
                _id: '$region',
                pokemon: {'$push': '$$ROOT'}
            })
            .addFields({
                sortKey: {$indexOfArray: [regions, '$_id']}
            })
            .sort({
                sortKey: 1
            })
        res.send(pokemon)
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.findOnePokemonAndUpdateTrainer = async (req, res) => {
    console.log('findOnePokemonAndUpdateTrainer-params: ' + JSON.stringify(req.params))
    console.log('findOnePokemonAndUpdateTrainer-query: ' + JSON.stringify(req.query))
    console.log('findOnePokemonAndUpdateTrainer-body: ' + JSON.stringify(req.body))
    try{
        const trainer = await Trainer.findOne({name: req.params.trainer})
        if(trainer){
            let keys = Object.keys(req.body)
            console.log([keys[0]] + ':' + req.body[keys[0]])
            const pokemon = await Pokemon.findOneAndUpdate(
                {
                    _id: req.params.id,
                    'trainer.name': { $ne: req.params.trainer }
                },
                {
                    $addToSet: {
                        trainer: {
                            name: req.params.trainer,
                            [keys[0]]: req.body[keys[0]]
                        }
                    }
                },
                {new: true}
            )
            if(!pokemon){
                console.log(['trainer.$.' + keys[0]] +':'+req.body[keys[0]])
                const pokemon = await Pokemon.findOneAndUpdate(
                    {
                        _id: req.params.id,
                        'trainer.name': { $eq: req.params.trainer }
                    },
                    {
                        $set: {
                            ['trainer.$.' + keys[0]]: req.body[keys[0]]
                        }
                    },
                    {new: true}
                )
            }
            res.send(pokemon)
        }else{
            res.send('error')
        }
    }catch (error) {
        res.status(500).send({ error })    
    }
}

exports.getTrainerShiny = async (req, res) => {
    if(req.param){console.log('getTrainerShiny: ' + JSON.stringify(req.params))}
    if(req.query){console.log('getTrainerShiny: ' + JSON.stringify(req.query))}
    if(req.body){console.log('getTrainerShiny: ' + JSON.stringify(req.body))}
    try {
        const pokemon = await Pokemon.aggregate()
            .match({
                shinyDex: true
            })
            .sort({dex: 1, formNumber: 1})
            .addFields({
                sortKey: {$indexOfArray: [regions, '$region']}
            })
            .sort({
                dex: 1,
                sortKey: 1
            })
            .group({
                _id: '$dex',
                pokemon: {'$push': '$$ROOT'}
            })
            .sort({_id: 1})
            .addFields({
                dex: { $first: "$pokemon.dex" },
                name: { $first: "$pokemon.name" },
                candy: { $first: "$pokemon.candy" },
                region: { $first: "$pokemon.region" }
            })
            .group({
                _id: '$region',
                pokemon: {'$push': '$$ROOT'}
            })
            .addFields({
                sortKey: {$indexOfArray: [regions, '$_id']}
            })
            .sort({
                sortKey: 1
            })
        res.send(pokemon)
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTrainerPerfect = async (req, res) => {
    if(req.param){console.log('getTrainerPerfect: ' + JSON.stringify(req.params))}
    if(req.query){console.log('getTrainerPerfect: ' + JSON.stringify(req.query))}
    if(req.body){console.log('getTrainerPerfect: ' + JSON.stringify(req.body))}
    try {
        const pokemon = await Pokemon.aggregate()
            .match({
                perfectDex: true
            })
            .sort({dex: 1})
            .group({
                _id: '$region',
                pokemon: {'$push': '$$ROOT'}
            })
            .addFields({
                sortKey: {$indexOfArray: [regions, '$_id']}
            })
            .sort({
                sortKey: 1
            })
        // console.log(pokemon)
        res.send(pokemon)
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTrainerLucky = async (req, res) => {
    if(req.param){console.log('getTrainerLucky: ' + JSON.stringify(req.params))}
    if(req.query){console.log('getTrainerLucky: ' + JSON.stringify(req.query))}
    if(req.body){console.log('getTrainerLucky: ' + JSON.stringify(req.body))}
    try {
        const pokemon = await Pokemon.aggregate()
            .match({
                luckyDex: true
            })
            .sort({dex: 1})
            .group({
                _id: '$region',
                pokemon: {'$push': '$$ROOT'}
            })
            .addFields({
                sortKey: {$indexOfArray: [regions, '$_id']}
            })
            .sort({
                sortKey: 1
            })
        res.send(pokemon)
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTrainerXxl = async (req, res) => {
    try {
        const pokemon = await Pokemon.aggregate()
            .match({
                xxlDex: true,
            })
            .sort({dex: 1})
            .group({
                _id: '$region',
                pokemon: {'$push': '$$ROOT'}
            })
            .addFields({
                sortKey: {$indexOfArray: [regions, '$_id']}
            })
            .sort({
                sortKey: 1
            })
        res.send(pokemon)
    } catch (error) {
        res.status(500).send({ error })
    }   
}

exports.getTrainerXxs = async (req, res) => {
    try {
        const pokemon = await Pokemon.aggregate()
            .match({
                xxsDex: true,
            })
            .sort({dex: 1})
            .group({
                _id: '$region',
                pokemon: {'$push': '$$ROOT'}
            })
            .addFields({
                sortKey: {$indexOfArray: [regions, '$_id']}
            })
            .sort({
                sortKey: 1
            })
        res.send(pokemon)
    } catch (error) {
        res.status(500).send({ error })
    } 
}

exports.getTrashHundo2 = async (req, res) => {
    console.log('getTradeTrash2:query: ' + JSON.stringify(req.query))
    // console.log('getTradeTrash2:params: ' + JSON.stringify(req.params))
    // console.log('getTradeTrash2:body: ' + JSON.stringify(req.body))
    var name1 = req.query.name1
    var name2 =  req.query.name2
    var region = req.query.region
    var gender = req.query.gender
    var regionText = 'EMPTY'
    if(region == 'filter'){
        region = {$nin: ['ALOLA','GALAR','HISUI','PALDEA']}
        regionText = '!alola&!galar&!hisui&!paldea'
    }else{
        region = region.toUpperCase()
        regionText = region.toString()
        region = {$in:[region]}
    }
    console.log(JSON.stringify(regionText))
    var filter1Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name1},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name1},unknownHundo: true}}}]}
        ]
    }
    var filter1Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name1},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name1}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name1},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name1}}]}]}
        ]
    }
    var filter2Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name2},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name2},unknownHundo: true}}}]}
        ]
    }
    var filter2Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name2},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name2}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name2},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name2}}]}]}
        ]
    }
    try {
        const pokemon1Have = await Pokemon.find(filter1Have, '-_id dex').sort({dex: 1})
        const pokemon1HaveUnique = [...new Set(pokemon1Have.map(item => item.dex))]
        //console.log(pokemon1HaveUnique)
        const pokemon1Want = await Pokemon.find(filter1Want, '-_id dexGroup').sort({dex: 1})
        const pokemon1WantUnique = [...new Set(pokemon1Want.map(item => item.dexGroup))]
        const pokemon1WantSplit = []
        pokemon1WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon1WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon1WantSplit.push(Number(x))
                })
            }
          });
        const pokemon1WantSplitUnique = [...new Set(pokemon1WantSplit.map(item => item))]

        //console.log(pokemon1WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon1 = pokemon1HaveUnique.filter(x => !pokemon1WantSplitUnique.includes(x));
        //console.log(pokemon1)

        const pokemon2Have = await Pokemon.find(filter2Have, '-_id dex').sort({dex: 1})
        const pokemon2HaveUnique = [...new Set(pokemon2Have.map(item => item.dex))]
        //console.log(pokemon2HaveUnique)
        const pokemon2Want = await Pokemon.find(filter2Want, '-_id dexGroup').sort({dex: 1})
        const pokemon2WantUnique = [...new Set(pokemon2Want.map(item => item.dexGroup))]
        const pokemon2WantSplit = []
        pokemon2WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon2WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon2WantSplit.push(Number(x))
                })
            }
          });
        const pokemon2WantSplitUnique = [...new Set(pokemon2WantSplit.map(item => item))]

        //console.log(pokemon2WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon2 = pokemon2HaveUnique.filter(x => !pokemon2WantSplitUnique.includes(x));
        //console.log(pokemon2)
        var final = pokemon1.filter(x => pokemon2.includes(x));
        final = final.length > 0 ? final.join(',') : 'EMPTY';
        var genderText = gender === 'male' ? '!FEMALE' : '!MALE';
        var finalString = final + '&' + regionText + '&' + genderText + '&!4*&!XXL&!XXS&!COSTUME&!SHADOW&!SHINY&!DYNAMAX&!GIGANTAMAX&!LEGENDARY&!ULTRABEAST'
        console.log(finalString)
        res.send({message: finalString}) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTrashHundo4 = async (req, res) => {
    function findSameValues(arr1, arr2, arr3, arr4) {
        const combinedArray = [...arr1, ...arr2, ...arr3, ...arr4];
        const valueCounts = {};
        const sameValues = [];
      
        for (const value of combinedArray) {
          valueCounts[value] = (valueCounts[value] || 0) + 1;
        }
      
        for (const value in valueCounts) {
          if (valueCounts[value] === 4) {
            sameValues.push(value);
          }
        }
        
        //return sameValues
        //returnSameValues = 
        //console.log(returnSameValues)
        return sameValues.length > 0 ? sameValues.join(',') : 'EMPTY';
    }
    console.log('getTradeTrash4:query: ' + JSON.stringify(req.query))
    // console.log('getTradeTrash2:params: ' + JSON.stringify(req.params))
    // console.log('getTradeTrash2:body: ' + JSON.stringify(req.body))
    var name1 = req.query.name1
    var name2 =  req.query.name2
    var name3 =  req.query.name3
    var name4 =  req.query.name4
    var region = req.query.region
    var gender = req.query.gender
    var regionText = ''
    if(region == 'filter'){
        region = {$nin: ['ALOLA','GALAR','HISUI','PALDEA']}
        regionText = '!alola&!galar&!hisui&!paldea'
    }else{
        region = region.toUpperCase()
        regionText = region.toString()
        region = {$in:[region]}
    }
    console.log(JSON.stringify(regionText))
    var filter1Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name1},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name1},unknownHundo: true}}}]}
        ]
    }
    var filter1Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name1},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name1}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name1},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name1}}]}]}
        ]
    }
    var filter2Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name2},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name2},unknownHundo: true}}}]}
        ]
    }
    var filter2Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name2},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name2}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name2},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name2}}]}]}
        ]
    }
    var filter3Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name3},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name3},unknownHundo: true}}}]}
        ]
    }
    var filter3Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name3},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name3}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name3},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name3}}]}]}
        ]
    }
    var filter4Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name4},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name4},unknownHundo: true}}}]}
        ]
    }
    var filter4Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name4},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name4}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name4},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name4}}]}]}
        ]
    }
    try {
        const pokemon1Have = await Pokemon.find(filter1Have, '-_id dex').sort({dex: 1})
        const pokemon1HaveUnique = [...new Set(pokemon1Have.map(item => item.dex))]
        //console.log(pokemon1HaveUnique)
        const pokemon1Want = await Pokemon.find(filter1Want, '-_id dexGroup').sort({dex: 1})
        const pokemon1WantUnique = [...new Set(pokemon1Want.map(item => item.dexGroup))]
        const pokemon1WantSplit = []
        pokemon1WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon1WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon1WantSplit.push(Number(x))
                })
            }
          });
        const pokemon1WantSplitUnique = [...new Set(pokemon1WantSplit.map(item => item))]

        //console.log(pokemon1WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon1 = pokemon1HaveUnique.filter(x => !pokemon1WantSplitUnique.includes(x));
        //console.log(pokemon1)

        const pokemon2Have = await Pokemon.find(filter2Have, '-_id dex').sort({dex: 1})
        const pokemon2HaveUnique = [...new Set(pokemon2Have.map(item => item.dex))]
        //console.log(pokemon2HaveUnique)
        const pokemon2Want = await Pokemon.find(filter2Want, '-_id dexGroup').sort({dex: 1})
        const pokemon2WantUnique = [...new Set(pokemon2Want.map(item => item.dexGroup))]
        const pokemon2WantSplit = []
        pokemon2WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon2WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon2WantSplit.push(Number(x))
                })
            }
          });
        const pokemon2WantSplitUnique = [...new Set(pokemon2WantSplit.map(item => item))]

        //console.log(pokemon2WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon2 = pokemon2HaveUnique.filter(x => !pokemon2WantSplitUnique.includes(x));
        //console.log(pokemon2)

        const pokemon3Have = await Pokemon.find(filter3Have, '-_id dex').sort({dex: 1})
        const pokemon3HaveUnique = [...new Set(pokemon3Have.map(item => item.dex))]
        //console.log(pokemon2HaveUnique)
        const pokemon3Want = await Pokemon.find(filter3Want, '-_id dexGroup').sort({dex: 1})
        const pokemon3WantUnique = [...new Set(pokemon3Want.map(item => item.dexGroup))]
        const pokemon3WantSplit = []
        pokemon3WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon3WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon3WantSplit.push(Number(x))
                })
            }
          });
        const pokemon3WantSplitUnique = [...new Set(pokemon3WantSplit.map(item => item))]

        //console.log(pokemon2WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon3 = pokemon3HaveUnique.filter(x => !pokemon3WantSplitUnique.includes(x));

        const pokemon4Have = await Pokemon.find(filter4Have, '-_id dex').sort({dex: 1})
        const pokemon4HaveUnique = [...new Set(pokemon4Have.map(item => item.dex))]
        //console.log(pokemon2HaveUnique)
        const pokemon4Want = await Pokemon.find(filter4Want, '-_id dexGroup').sort({dex: 1})
        const pokemon4WantUnique = [...new Set(pokemon4Want.map(item => item.dexGroup))]
        const pokemon4WantSplit = []
        pokemon4WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon4WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon4WantSplit.push(Number(x))
                })
            }
          });
        const pokemon4WantSplitUnique = [...new Set(pokemon4WantSplit.map(item => item))]

        //console.log(pokemon2WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon4 = pokemon4HaveUnique.filter(x => !pokemon4WantSplitUnique.includes(x));

          var final = findSameValues(pokemon1,pokemon2,pokemon3,pokemon4)
        //var final = pokemon1.filter(x => pokemon2.includes(x));
        var genderText = gender === 'male' ? '!FEMALE' : '!MALE';
        var finalString = final + '&' + regionText + '&' + genderText + '&!4*&!XXL&!XXS&!COSTUME&!SHADOW&!SHINY&!DYNAMAX&!GIGANTAMAX&!LEGENDARY&!ULTRABEAST'
        console.log(finalString)
        res.send({message: finalString}) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTrashHundo3 = async (req, res) => {
    function findSameValues(arr1, arr2, arr3) {
        const combinedArray = [...arr1, ...arr2, ...arr3];
        const valueCounts = {};
        const sameValues = [];
      
        for (const value of combinedArray) {
          valueCounts[value] = (valueCounts[value] || 0) + 1;
        }
      
        for (const value in valueCounts) {
          if (valueCounts[value] === 3) {
            sameValues.push(value);
          }
        }
        
        //return sameValues
        //returnSameValues = 
        //console.log(returnSameValues)
        return sameValues.length > 0 ? sameValues.join(',') : 'EMPTY';
    }
    console.log('getTradeTrash4:query: ' + JSON.stringify(req.query))
    // console.log('getTradeTrash2:params: ' + JSON.stringify(req.params))
    // console.log('getTradeTrash2:body: ' + JSON.stringify(req.body))
    var name1 = req.query.name1
    var name2 =  req.query.name2
    var name3 =  req.query.name3
    var region = req.query.region
    var gender = req.query.gender
    var regionText = ''
    if(region == 'filter'){
        region = {$nin: ['ALOLA','GALAR','HISUI','PALDEA']}
        regionText = '!alola&!galar&!hisui&!paldea'
    }else{
        region = region.toUpperCase()
        regionText = region.toString()
        region = {$in:[region]}
    }
    console.log(JSON.stringify(regionText))
    var filter1Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name1},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name1},unknownHundo: true}}}]}
        ]
    }
    var filter1Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name1},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name1}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name1},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name1}}]}]}
        ]
    }
    var filter2Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name2},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name2},unknownHundo: true}}}]}
        ]
    }
    var filter2Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name2},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name2}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name2},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name2}}]}]}
        ]
    }
    var filter3Have = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null, false]},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[{[gender]: true},{trainer: {$elemMatch: {name: {$eq: name3},[gender + 'Hundo']: true}}}]},
            {$and:[{male: false,female: false},{trainer: {$elemMatch: {name: {$eq: name3},unknownHundo: true}}}]}
        ]
    }
    var filter3Want = {
        release: true,
        shadow: {$in: [null, false]},
        costume: {$in: [null,'']},
        dmax: { $nin: [ true ] },
        megaDex: { $nin: [ true ] },
        gmaxDex: { $nin: [ true ] },
        region: region,
        $or:[
            {$and:[
                {[gender]: true},
                {$or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name3},
                        [gender + 'Hundo']: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name3}}
                ]}
            ]},
            {$and:[{male: false,female: false},{$or:[{trainer: {$elemMatch: {name: {$eq: name3},unknownHundo: {$in: [null, false]}}}},{'trainer.name': {$ne: name3}}]}]}
        ]
    }
    try {
        const pokemon1Have = await Pokemon.find(filter1Have, '-_id dex').sort({dex: 1})
        const pokemon1HaveUnique = [...new Set(pokemon1Have.map(item => item.dex))]
        //console.log(pokemon1HaveUnique)
        const pokemon1Want = await Pokemon.find(filter1Want, '-_id dexGroup').sort({dex: 1})
        const pokemon1WantUnique = [...new Set(pokemon1Want.map(item => item.dexGroup))]
        const pokemon1WantSplit = []
        pokemon1WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon1WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon1WantSplit.push(Number(x))
                })
            }
          });
        const pokemon1WantSplitUnique = [...new Set(pokemon1WantSplit.map(item => item))]

        //console.log(pokemon1WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon1 = pokemon1HaveUnique.filter(x => !pokemon1WantSplitUnique.includes(x));
        //console.log(pokemon1)

        const pokemon2Have = await Pokemon.find(filter2Have, '-_id dex').sort({dex: 1})
        const pokemon2HaveUnique = [...new Set(pokemon2Have.map(item => item.dex))]
        //console.log(pokemon2HaveUnique)
        const pokemon2Want = await Pokemon.find(filter2Want, '-_id dexGroup').sort({dex: 1})
        const pokemon2WantUnique = [...new Set(pokemon2Want.map(item => item.dexGroup))]
        const pokemon2WantSplit = []
        pokemon2WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon2WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon2WantSplit.push(Number(x))
                })
            }
          });
        const pokemon2WantSplitUnique = [...new Set(pokemon2WantSplit.map(item => item))]

        //console.log(pokemon2WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon2 = pokemon2HaveUnique.filter(x => !pokemon2WantSplitUnique.includes(x));
        //console.log(pokemon2)

        const pokemon3Have = await Pokemon.find(filter3Have, '-_id dex').sort({dex: 1})
        const pokemon3HaveUnique = [...new Set(pokemon3Have.map(item => item.dex))]
        //console.log(pokemon2HaveUnique)
        const pokemon3Want = await Pokemon.find(filter3Want, '-_id dexGroup').sort({dex: 1})
        const pokemon3WantUnique = [...new Set(pokemon3Want.map(item => item.dexGroup))]
        const pokemon3WantSplit = []
        pokemon3WantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemon3WantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemon3WantSplit.push(Number(x))
                })
            }
          });
        const pokemon3WantSplitUnique = [...new Set(pokemon3WantSplit.map(item => item))]

        //console.log(pokemon2WantSplitUnique)

        //const pokemon1WantSplitUniqueString = pokemon1WantSplitUnique.join(',')
        //console.log(pokemon1WantSplitUnique)
        let pokemon3 = pokemon3HaveUnique.filter(x => !pokemon3WantSplitUnique.includes(x));

       

          var final = findSameValues(pokemon1,pokemon2,pokemon3)
        //var final = pokemon1.filter(x => pokemon2.includes(x));
        var genderText = gender === 'male' ? '!FEMALE' : '!MALE';
        var finalString = final + '&' + regionText + '&' +  genderText + '&!4*&!XXL&!XXS&!COSTUME&!SHADOW&!SHINY&!DYNAMAX&!GIGANTAMAX&!LEGENDARY&!ULTRABEAST'
        console.log(finalString)
        res.send({message: finalString}) 
    } catch (error) {
        res.status(500).send({ error })
    }
}
exports.getTradeShiny = async (req, res) => {
    console.log('getTradeShiny:query: ' + JSON.stringify(req.query))
    var filter
    if(req.query.search == 'want'){
        filter = {
            shinyDex: true,
            release: true,
            releaseShiny: true,
            trade: { $nin: [ false ] },
            $or: [
                {
                    trainer: {
                        $elemMatch: {
                            name: { $eq: req.query.name },
                            shiny: { $in: [ null, false ] }
                        }
                    }
                },
                {
                    trainer: {
                        $not: {
                            $elemMatch: {
                                name: { $eq: req.query.name }
                            }
                        }
                    }
                }
            ]     
        }
    }else if(req.query.search == 'have'){
        filter = {
            shinyDex: true,
            releaseShiny: true,
            trade: { $nin: [ false ] },
            $or: [
                {
                    trainer: {
                        $elemMatch: {
                            name: { $eq: req.query.name },
                            shiny: true
                        }
                    }
                }
            ]     
        }
    }else{
        res.status(500).send({ error: 'error' })
        return
    }
    try {
        const pokemonWant = await Pokemon.find(filter)
        .sort({
            dex: 1,
            formNumber: 1,
            formName: 1
        })
        res.send(pokemonWant) 
    } catch (error) {
        res.status(500).send({ error })
    }
}
exports.getViewPerfect = async (req, res) => {
    console.log('getViewPerfect:query: ' + JSON.stringify(req.query))
    try {
        const pokemonWant = await Pokemon.find({
            perfectDex: true,
            release: true,
            // evolution: { $lte: 1 },
            trade: { $nin: [ false ] },
            $or: [
                {
                    trainer: {
                        $elemMatch: {
                            name: { $eq: req.query.name },
                            perfect: { $in: [ null, false ] }
                        }
                    }
                },
                {
                    trainer: {
                        $not: {
                            $elemMatch: {
                                name: { $eq: req.query.name }
                            }
                        }
                    }
                }
            ]     
        })
        .sort({
            dex: 1
        })
        res.send(pokemonWant) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getViewLucky = async (req, res) => {
    console.log('getViewLucky:query: ' + JSON.stringify(req.query))
    try {
        const pokemonWant = await Pokemon.find({
            luckyDex: true,
            release: true,
            $or: [
                {
                    trainer: {
                        $elemMatch: {
                            name: { $eq: req.query.name },
                            lucky: { $in: [ null, false ] }
                        }
                    }
                },
                {
                    trainer: {
                        $not: {
                            $elemMatch: {
                                name: { $eq: req.query.name }
                            }
                        }
                    }
                }
            ]     
        })
        .sort({
            dex: 1
        })
        res.send(pokemonWant) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getViewCostume = async (req, res) => {
    console.log('getViewCostume:query: ' + JSON.stringify(req.query))
    var filter = {
            shadow: { $in: [ null, false ] },
            costumeName: { $ne: null },
            release: true,
            // $or: [
            //     { $and: [
            //         { male: true },
            //         { $or: [
            //             { trainer: { $elemMatch: {
            //                 name: { $eq: req.query.name },
            //                 [ 'maleHundo' ]: { $in: [ null, false ] }
            //             } } },
            //             { 'trainer.name': { $ne: req.query.name } }
            //         ] }
            //     ] },
            //     { $and: [
            //         { female: true },
            //         { $or: [
            //             { trainer: { $elemMatch: {
            //                 name: { $eq: req.query.name },
            //                 [ 'femaleHundo' ]: { $in: [ null, false ] }
            //             } } },
            //             { 'trainer.name': { $ne: req.query.name } }
            //         ] }
            //     ] },
            //     { $and: [
            //         { male: false, female: false },
            //         { $or: [
            //             { trainer: { $elemMatch: {
            //                 name: { $eq: req.query.name },
            //                 unknownHundo: { $in: [ null, false ] }
            //             } } },
            //             { 'trainer.name': { $ne: req.query.name } }
            //         ] }
            //     ] }
            // ]
    }
    try {
        const pokemonWant = await Pokemon.find(filter).sort({dex: 1,costumeNumber: 1})
        res.send(pokemonWant) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getView = async (req, res) => {
    console.log('getView:query: ' + JSON.stringify(req.query))
    var filter = {
        [req.query.dex + 'Dex']:true,
        release: true,
        trade: { $nin: [ false ] },
        $or:[
            {trainer: {$elemMatch: {
                name: {$eq: req.query.name},
                [req.query.dex]: {$in: [null, false]}
            }}},
            {'trainer.name': {$ne: req.query.name}}
        ]        
    }
    try {
        const pokemonWant = await Pokemon.find(filter).sort({dex: 1})
        console.log(pokemonWant)
        res.send(pokemonWant) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTradeXXL = async (req, res) => {
    console.log('getXXL:query: ' + JSON.stringify(req.query))
    var filterWant = {
        xxlDex:true,
        trade: { $nin: [ false ] },
        $or:[
            {trainer: {$elemMatch: {
                name: {$eq: req.query.name},
                xxl: {$in: [null, false]}
            }}},
            {'trainer.name': {$ne: req.query.name}}
        ]
    }
    var filterHave = {
        xxlDex:true,
        trainer: {
            $elemMatch: {
                name: {$eq: req.query.name},
                xxl: true
            }
        }
    }
    try {
        const pokemonHave = await Pokemon.find(filterHave, '-_id dex').sort({dex: 1})
        const pokemonHaveUnique = [...new Set(pokemonHave.map(item => item.dex))]
        const pokemonWant = await Pokemon.find(filterWant, '-_id dexGroup').sort({dex: 1})
        const pokemonWantUnique = [...new Set(pokemonWant.map(item => item.dexGroup))]
        const pokemonWantSplit = []
        pokemonWantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemonWantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemonWantSplit.push(Number(x))
                })
            }
        });
        const pokemonWantSplitUnique = [...new Set(pokemonWantSplit.map(item => item))]
        var final
        if(req.query.search == 'want'){
            console.log('Want')
            final = pokemonWantSplitUnique
            final = final.length > 0 ? final.join(',') : 'EMPTY';
            final = final + '!4*&!TRADED&XXL&!COSTUME&!SHADOW&!DYNAMAX&!GIGANTAMAX'
        }else{
            console.log('Have')
            final = pokemonHaveUnique.filter(x => !pokemonWantSplitUnique.includes(x));
            final = final.length > 0 ? final.join(',') : 'EMPTY'
            final = final + '!4*&!TRADED&XXL&!COSTUME&!SHADOW&!DYNAMAX&!GIGANTAMAX'
        }
        console.log(final)
        res.send({message: final}) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTradeXXS = async (req, res) => {
    console.log('getXXS:query: ' + JSON.stringify(req.query))
    var filterWant = {
        xxsDex:true,
        trade: { $nin: [ false ] },
        $or:[
            {trainer: {$elemMatch: {
                name: {$eq: req.query.name},
                xxs: {$in: [null, false]}
            }}},
            {'trainer.name': {$ne: req.query.name}}
        ]
    }
    var filterHave = {
        xxsDex:true,
        trainer: {
            $elemMatch: {
                name: {$eq: req.query.name},
                xxs: true
            }
        }
    }
    try {
        const pokemonHave = await Pokemon.find(filterHave, '-_id dex').sort({dex: 1})
        const pokemonHaveUnique = [...new Set(pokemonHave.map(item => item.dex))]
        const pokemonWant = await Pokemon.find(filterWant, '-_id dexGroup').sort({dex: 1})
        const pokemonWantUnique = [...new Set(pokemonWant.map(item => item.dexGroup))]
        const pokemonWantSplit = []
        pokemonWantUnique.forEach(element => {
            const subStrings = element.split(',');
            if(subStrings.length == 1){
                pokemonWantSplit.push(Number(subStrings[0]))
            }else{
                subStrings.forEach(x => {
                    pokemonWantSplit.push(Number(x))
                })
            }
        });
        const pokemonWantSplitUnique = [...new Set(pokemonWantSplit.map(item => item))]
        var final
        if(req.query.search == 'want'){
            console.log('Want')
            final = pokemonWantSplitUnique
            final = final.length > 0 ? final.join(',') : 'EMPTY';
            final = final + '!4*&!TRADED&XXS&!COSTUME&!SHADOW&!DYNAMAX&!GIGANTAMAX&!MYTHICAL'
        }else{
            console.log('Have')
            final = pokemonHaveUnique.filter(x => !pokemonWantSplitUnique.includes(x));
            final = final.length > 0 ? final.join(',') : 'EMPTY'
            final = final + '!4*&!TRADED&XXS&!COSTUME&!SHADOW&!DYNAMAX&!GIGANTAMAX&!MYTHICAL'
        }
        console.log(final)
        res.send({message: final}) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTradeHundoExclude = async (req, res) => {
    console.log('getTradeHundoExclude: ' + JSON.stringify(req.query))
    var newRegion = regionFix(req.query.region)
    // console.log(newRegion)
    var trainer = req.query.name
    var gender = req.query.gender
    var exclude = req.query.exclude.split(',')
    var pokemonWantUnique = await pokemonWant(trainer, gender, newRegion.region)
    // console.log(pokemonWantUnique)
    try{
        var pokemonWantUnique = await pokemonWant(trainer, gender, newRegion.region)
        for (const name of exclude) {
            const excludePokemon = await pokemonWant(name, gender, newRegion.region)
            // console.log(excludePokemon)
            pokemonWantUnique = [...new Set(pokemonWantUnique.filter(x => !excludePokemon.includes(x)))]
        }
        // exclude.forEach(async (name) => {
        //     excludePokemon = await pokemonWant(name, gender, newRegion.region)
        //     console.log(excludePokemon)
        //     pokemonWantUnique = [...new Set(pokemonWantUnique.filter(x => !excludePokemon.includes(x)))]
        // });
        var final = pokemonWantUnique
        // console.log(final)
        final = final.length > 0 ? final.join(',') : 'EMPTY'
        var genderText = gender === 'male' ? '!FEMALE' : '!MALE';
        var finalString = final + '&' + newRegion.regionText.toUpperCase() + '&' + genderText + '&!4*&!TRADED&!XXL&!XXS&!COSTUME&!SHADOW&!SHINY&!DYNAMAX&!GIGANTAMAX&!MYTHICAL&!LEGENDARY&!ULTRABEAST'
        console.log(finalString)
        res.send({message: finalString}) 
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getTradeHundo = async (req, res) => {
    console.log('getTradeHundo:query: ' + JSON.stringify(req.query))
    var newRegion = regionFix(req.query.region)
    var trainer = req.query.name
    var gender = req.query.gender
    try{
        const pokemonHaveUnique = await pokemonHave(trainer, gender, newRegion.region)
        const pokemonWantUnique = await pokemonWant(trainer, gender, newRegion.region)
        var final
        if(req.query.search == 'want'){
            // console.log('Want')
            final = pokemonWantUnique
            final = final.length > 0 ? final.join(',') : 'EMPTY';
        }else{
            // console.log('Have')
            final = pokemonHaveUnique.filter(x => !pokemonWantUnique.includes(x));
            final = final.length > 0 ? final.join(',') : 'EMPTY'
        }
        var genderText = req.query.gender === 'male' ? '!FEMALE' : '!MALE';
        var finalString = final + '&' + newRegion.regionText.toUpperCase() + '&' + genderText + '&!4*&!TRADED&!XXL&!XXS&!COSTUME&!SHADOW&!SHINY&!DYNAMAX&!GIGANTAMAX&!MYTHICAL&!LEGENDARY&!ULTRABEAST'
        console.log(finalString)
        res.send({message: finalString}) 
    } catch (error) {
        res.status(500).send({ error })
    }
}