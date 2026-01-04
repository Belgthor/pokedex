const express = require('express')
const controller = require('./pokemonController')
const { authJwt } = require("../middleware/index");
const router = express.Router()

router.get('/pokemon/all',[
        authJwt.isAdmin
    ], controller.getPokemonAll)
router.get('/pokemon/main',[
        authJwt.isAdmin
    ], controller.getPokemonMain)
router.get('/pokemon/shiny',[
        authJwt.isAdmin
    ], controller.getPokemonShiny)
router.get('/pokemon/lucky',[
        authJwt.isAdmin
    ], controller.getPokemonLucky)
router.get('/pokemon/xxl',[
        authJwt.isAdmin
    ], controller.getPokemonXXL)
router.get('/pokemon/xxs',[
        authJwt.isAdmin
    ], controller.getPokemonXXS)

router.get('/trainer/hundo', controller.getTrainerHundo)
router.get('/trainer/xxl', controller.getTrainerXxl)
router.get('/trainer/xxs', controller.getTrainerXxs)
router.get('/trainer/costume', controller.getTrainerCostume)
router.get('/trainer/shiny', controller.getTrainerShiny)
router.get('/trainer/lucky', controller.getTrainerLucky)
router.get('/trainer/perfect', controller.getTrainerPerfect)
// router.get('/trainer/perfect',[
//         authJwt.verifyToken
//     ], controller.getTrainerPerfect)

router.get('/trash/hundo2', controller.getTrashHundo2)
router.get('/trash/hundo3', controller.getTrashHundo3)
router.get('/trash/hundo4', controller.getTrashHundo4)

router.get('/trade/hundo', controller.getTradeHundo)
router.get('/trade/hundo/exclude', controller.getTradeHundoExclude)
router.get('/trade/xxl', controller.getTradeXXL)
router.get('/trade/xxs', controller.getTradeXXS)
router.get('/trade/shiny', controller.getTradeShiny)
router.get('/trade/view', controller.getView)
router.get('/trade/view/costume', controller.getViewCostume)
router.get('/trade/view/lucky', controller.getViewLucky)
router.get('/trade/view/perfect', controller.getViewPerfect)


router.patch('/pokemon/:id/:trainer',[
        authJwt.verifyToken
    ], controller.findOnePokemonAndUpdateTrainer)

module.exports = router