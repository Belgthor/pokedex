import { TradeEngine } from '../services/tradeEngine';

const regions = [
  'KANTO', 'JOHTO', 'HOENN', 'SINNOH', 'UNOVA',
  'KALOS', 'ALOLA', 'GALAR', 'HISUI', 'PALDEA', 'UNIDENTIFIED'
] as const;

function regionFix(region: any){
    let regionText: string;
    let regionQuery: any;
    if(region == 'filter'){
        regionQuery = {$nin: ['ALOLA','GALAR','HISUI','PALDEA']}
        regionText = '!ALOLA&!GALAR&!HISUI&!PALDEA'
    }else{
        regionQuery = {$in: [region.toUpperCase()]}
        regionText = region.toString()
    }
    return {query: regionQuery, text: regionText}
}

// --------------------------------------------------
// CONTROLLERS
// --------------------------------------------------

export const getTradePerfect = async (req: any, res: any) => {
    console.log('getTradePerfect request:', req.query);
    try {
        const cfg = {
            dexField: 'perfectDex',
            trainerField: 'perfect',
            gender: null,
            region: null,
            finalFlags: '&!4*&!TRADED'
        };
        const result = await TradeEngine.run(
            req.query.name,
            req.query.search,
            cfg
        );
        return res.json({ message: result + cfg.finalFlags });
    } catch (error: any) {
        console.error('getTradePerfect error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const getTradeLucky = async (req: any, res: any) => {
    console.log('getTradeLucky request:', req.query);
    try {
        const cfg = {
            dexField: 'luckyDex',
            trainerField: 'lucky',
            gender: null,
            region: null,
            finalFlags: '&!4*&!TRADED'
        };
        const result = await TradeEngine.run(
            req.query.name,
            req.query.search,
            cfg
        );
        return res.json({ message: result + cfg.finalFlags });
    } catch (error: any) {
        console.error('getTradeLucky error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const getTradeShiny = async (req: any, res: any) => {
    console.log('getTradeShiny request:', req.query);
    try {
        const cfg = {
            dexField: 'shinyDex',
            trainerField: 'shiny',
            gender: null,
            region: null,
            finalFlags: '&!4*&!TRADED&SHINY'
        };
        const result = await TradeEngine.run(
            req.query.name,
            req.query.search,
            cfg
        );
        return res.json({ message: result + cfg.finalFlags });
    } catch (error: any) {
        console.error('getTradeShiny error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const getTradeXXL = async (req: any, res: any) => {
    console.log('getTradeXXL request:', req.query);
    try{
        const cfg = {
            dexField: 'xxlDex',
            trainerField: 'xxl',
            gender: null,
            region: null,
            finalFlags: '&!4*&!TRADED'
        };
        const result = await TradeEngine.run(
            req.query.name,
            req.query.search,
            cfg
        );
        return res.json({ message: result + cfg.finalFlags });
    } catch (error: any) {
        console.error('getTradeXXL error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const getTradeXXS = async (req: any, res: any) => {
    console.log('getTradeXXS request:', req.query);
    try {
    const cfg = {
        dexField: 'xxsDex',
        trainerField: 'xxs',
        gender: null,
        region: null,
        finalFlags: '&!4*&!TRADED'
    };
    const result = await TradeEngine.run(
        req.query.name,
        req.query.search,
        cfg
    );
    res.json({ message: result + cfg.finalFlags });
    } catch (error: any) {
        console.error('getTradeXXS error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const getTradeHundo = async (req: any, res: any) => {
    console.log('getTradeHundo request:', req.query);
    try {
        const cfg = {
            dexField: 'hundoDex',
            trainerField: null,
            gender: req.query.gender,
            region: regionFix(req.query.region),
            finalFlags: '&!4*&!TRADED'
        };
        const result = await TradeEngine.run(
            req.query.name,
            req.query.search,
            cfg
        );
        res.json({ message: result + '&' + cfg.region.text + cfg.finalFlags });
    } catch (error: any) {
        console.error('getTradeHundo error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};