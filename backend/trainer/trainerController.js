const Trainer = require('./trainerModel')

exports.trainer = async (req, res) => {
    console.log('trainer: ' + JSON.stringify(req.query))
    try {
        const trainer = await Trainer.find({}).sort({name: 1})
        res.send(trainer)
    } catch (error) {
        res.status(500).send({ error })
    }
}
exports.findOneTrainer = async (req, res) => {
    if (!req.params) {
        res.status(400)
        throw new Error('params Empty')
    }
    console.log('findOneTrainer: ' + JSON.stringify(req.params))
    try {
        const trainer = await Trainer.findOne({ name: req.params.name }, '-_id');
        res.send(trainer)
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.trainerBoard = (req, res) => {
  res.status(200).send("Trainer Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};