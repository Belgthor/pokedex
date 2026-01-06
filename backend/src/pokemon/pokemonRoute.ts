import { Router } from 'express';
import * as controller from './pokemonController';

const router = Router();

// --------------------------------------------------
// POKÉMON ROUTES
// --------------------------------------------------
router.get('/trade/hundo', controller.getTradeHundo);
router.get('/trade/xxl', controller.getTradeXXL);
router.get('/trade/xxs', controller.getTradeXXS);
router.get('/trade/shiny', controller.getTradeShiny);
router.get('/trade/lucky', controller.getTradeLucky);
router.get('/trade/perfect', controller.getTradePerfect);

export default router;