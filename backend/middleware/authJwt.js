const jwt = require("jsonwebtoken");
const config = require("./authConfig");
const Role = require('../login/roleModel')
const Trainer = require('../trainer/trainerModel')

verifyToken = (req, res, next) => {
  // console.log('verifyToken: ' + JSON.stringify(req.headers.authorization))
  let token = req.headers.authorization
  console.log('token: ' + token)
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  // console.log('secret: ' + config.secret)
  token = token.slice(7)
  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                console.log('err: ' + JSON.stringify(err))
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              console.log(decoded)
              req.trainerId = decoded.id;
              next();
            });
};

isAdmin = async (req, res, next) => {
  try{
    const trainer = await Trainer.findById(req.trainerId)
    if(trainer){
      const roles = await Role.find(
      {
        _id: { $in: trainer.roles },
      })
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res.status(403).send({ message: "Require Admin Role!" });
    }
  }catch(err){
    return res.status(500).send({ message: err });
  }
};

isModerator = async (req, res, next) => {
  try{
    const trainer = await Trainer.findById(req.trainerId)
    if(trainer){
      const roles = await Role.find(
      {
        _id: { $in: trainer.roles },
      })
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator"||roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res.status(403).send({ message: "Require Mod Role!" });
    }
  }catch(err){
    return res.status(500).send({ message: err });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
