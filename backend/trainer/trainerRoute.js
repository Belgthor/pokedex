const express = require('express')
// const { verifySignUp } = require("../middleware/index");
// const { authJwt } = require("../middleware/index");
// const authController = require('../login/authController')
const controller = require('./trainerController')
const router = express.Router()


// router.post('/trainer/test',)
// router.post('/trainer/signup', authController.signup)
// router.post("/trainer/signin", authController.signin);
// router.post("/trainer/signout", authController.signout);

// router.get("/trainer/all", controller.allAccess);

// router.get(
//     "/trainer/trainer",
//     [
//         authJwt.verifyToken
//     ],
//     controller.trainerBoard);

// router.get(
//     "/trainer/mod",
//     [
//         authJwt.verifyToken, authJwt.isModerator
//     ],
//     controller.moderatorBoard
// );

// router.get(
//     "/trainer/admin",
//     [
//         authJwt.verifyToken, authJwt.isAdmin
//     ],
//     controller.adminBoard
// );

router.get('/trainer', controller.trainer)
router.get('/trainer/:name', controller.findOneTrainer)

module.exports = router