const ROLES = ["trainer", "admin", "moderator"];
const Trainer = require('../trainer/trainerModel')

checkDuplicateTrainernameOrEmail = async (req, res, next) => {
    try {
        const trainer = await Trainer.findOne({
            name: req.body.name
        })
        if (trainer) {
            console.log('Trainer found:', trainer);
            res.status(400).send({ message: "Failed! trainer is already in use!" });
            return;
        }
        next();
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send({ message: error });
        return
    }
};

checkRolesExisted = (req, res, next) => {
    console.log(req.body.roles)
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

  next();
};

const verifySignUp = {
  checkDuplicateTrainernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
