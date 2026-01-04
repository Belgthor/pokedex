const config = require("../middleware/authConfig");
const Trainer = require('../trainer/trainerModel')
const Role = require('../login/roleModel')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
function getcookie(req) {
  const cookieHeader = req.headers && req.headers.cookie;
  if (!cookieHeader) return [];
  // cookieHeader example: "user=someone; session=mySessionID"
  return cookieHeader.split('; ').map(c => c.trim()).filter(Boolean);
}
exports.login = async (req, res) => {
    console.log("login: " + JSON.stringify(req.body))
    try {
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(400).send({ error: "name and password are required." });
        }
        const trainer = await Trainer.findOne({
            name: name,
        }).populate("roles").select("-__v")
        console.log(trainer)
        if(!trainer){
            return res.status(404).send({ message: "Trainer Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            password,
            trainer.password
        );
        if(!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        const token = jwt.sign(
        { id: trainer._id },
        config.secret,
        {
            expiresIn: 2629800, // 86400 24 hours 2629800 1 month 365d 1 year
            subject: trainer.name
        }
        );
        console.log(token )
        const refreshToken = jwt.sign({
            id: trainer._id,
        }, config.refresh, { expiresIn: '10m' });

        // Assigning refresh token in http-only cookie 
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'Lax', secure: false,
            maxAge: 10 * 60 * 1000
        });
        console.log(refreshToken )
        return res.json({ token });
  } catch (error) {
        console.error("Registration error: ", error);
        return res.json(
            { error: "Internal Server error" },
            { status: 500 }
        );
  }
}
exports.changePW =  async (req, res) => {
    console.log("changePW: " + JSON.stringify(req.body))
    try {
        const { name, password, newPassword } = req.body
        if (!name || !password || !newPassword) {
            return res.status(400).send({ error: "name and password are required." });
        }
        const trainer = await Trainer.findOne({
            name: name,
        }).populate("roles").select("-__v")
        console.log(trainer)
        if(!trainer){
            return res.status(404).send({ message: "Trainer Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            password,
            trainer.password
        );
        if(!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        trainer.password = passwordHash
        trainer.save()
        const token = jwt.sign(
        { id: trainer._id },
        config.secret,
        {
            expiresIn: 2629800, // 86400 24 hours 2629800 1 month 365d 1 year
            subject: trainer.name
        }
        );
        return res.json({ token });
    } catch (error) {
        console.error("Change Password error: ", error);
        return res.json(
            { error: "Internal Server error" },
            { status: 500 }
        );
  }
}
exports.refresh = async (req, res) => {
    const { name } = req.body
    // console.log(JSON.stringify(req))
    // var cookie = getcookie(req);
    // console.log(cookie);
    // if(req.headers){
    //     console.log(JSON.stringify(req.headers))
    // }
    // if(req.cookies){
    //     console.log(JSON.stringify(req.cookies))
    // }
    if (req.cookies?.jwt) {
        
        // Destructuring refreshToken from cookie
        const refreshToken = req.cookies.jwt;

        // Verifying refresh token
        const trainer = await Trainer.findOne({
            name: name,
        })
        jwt.verify(refreshToken, config.refresh,
            (err, decoded) => {
                if (err) {

                    // Wrong Refesh Token
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    // Correct token we send a new access token
                    
                    const token = jwt.sign(
                        { id: trainer._id },
                        config.secret,
                        {
                            expiresIn: '1m', // 86400 24 hours 2629800 1 month 365d 1 year
                        }
                    )
                    return res.json({ token });
                }
            })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
}
exports.register = async (req, res) => {
    try{
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(400).send({ error: "name and password are required." });
        }
        const trainer = await Trainer.findOne({
            name: name,
        })
        if(trainer){
            return res.status(409).send({ message: "Name already taken." });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newTrainer = new Trainer({
            name: name,
            password: passwordHash,
        });
        const roles = await Role.findOne({ name: "trainer" })
        newTrainer.roles = [roles._id];
        newTrainer.save()
        return res.json({message: 'User registered successfully.'}, {status: 201});
    }catch(error){
        console.error("Registration error: ", error);
        return res.json(
            { error: "Internal Server error" },
            { status: 500 }
        );
    }
}