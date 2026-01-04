const config = require("../middleware/authConfig");
const Role = require('../login/roleModel')
const Trainer = require('../trainer/trainerModel')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  console.log("signup: " + req.body)
  const trainer = new Trainer({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try{
    if (req.body.roles) {
      const roles = await Role.aggregate().match({
          name: { $in: req.body.roles }
      })
      if(roles){
        trainer.roles = roles.map((role) => role._id);
        trainer.save()
        return res.send({ message: "Trainer was registered successfully!" });
      }
    } else {
      roles = await Role.findOne({ name: "trainer" })
      trainer.roles = [roles._id];
      trainer.save()
      return res.send({ message: "Trainer was registered successfully!" });
    }
  }catch(err){
    res.status(500).send({ message: err });
    return
  }
};

exports.signin = async (req, res) => {
  console.log("signin: " + JSON.stringify(req.body))
//  const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
  try{
    const trainer = await Trainer.findOne({
      name: req.body.name,
    }).populate("roles").select("-__v")
    console.log(trainer)
    if(!trainer){
      return res.status(404).send({ message: "Trainer Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      trainer.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    console.log(trainer)
    const accessToken  = jwt.sign(
      { id: trainer._id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 120, // 86400 24 hours 2629800 1 month
      }
    );
    console.log(accessToken )
    // const refreshToken = jwt.sign({
    //         name: trainer.name,
    //     }, config.refresh, { expiresIn: '1d' });
    // console.log(refreshToken )
    // var authorities = [];
    // for (let i = 0; i < trainer.roles.length; i++) {
    //   authorities.push("ROLE_" + trainer.roles[i].name.toUpperCase());
    // }
    // console.log(authorities)
    // req.session.token = accessToken ;
    res.json({ accessToken });

    // res.status(200).send({ 
    //   id: trainer._id,
    //   name: trainer.name,
    //   email: trainer.email,
    //   roles: authorities,
    // });
  }catch(err){
    return res.status(500).send({ message: err });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
