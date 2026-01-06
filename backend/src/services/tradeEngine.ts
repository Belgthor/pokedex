import Pokemon from '../pokemon/pokemonModel';

export interface TradeConfig {
  dexField: string;            // e.g. "xxlDex", "shinyDex", "hundoDex"
  trainerField: string;        // e.g. "xxl", "shiny", "maleHundo"
  gender?: 'male' | 'female';  // only needed for hundo logic
  region: any;                 // { $in: [...] } or { $nin: [...] }
  exclude?: string[];          // trainers to exclude (hundo-exclude)
  finalFlags: string;          // e.g. "&XXL&!COSTUME&!SHADOW..."
}
export class TradeEngine {


  // --------------------------------------------------
  // BUILD WANT FILTER
  // --------------------------------------------------

      static buildWantFilter(name: string, cfg: any) {
        const base = {

        }
        if (cfg.gender) {
            const g = cfg.gender;
            return {
                ...base,
                release: true,
                // trade: { $nin: [ null, false ] },
                region: cfg.region?.query,
                shadow: { $nin: [true] },
                costume: { $exists: false },
                dmax: { $nin: [true] },
                megaDex: { $nin: [true] },
                gmaxDex: { $nin: [true] },
                $or: [
                    {
                        $and: [
                        { [g]: true },
                        {
                            $or: [
                            {
                                trainer: {
                                $elemMatch: {
                                    name,
                                    [`${g}Hundo`]: { $in: [null, false] }
                                }
                                }
                            },
                            { 'trainer.name': { $ne: name } }
                            ]
                        }
                        ]
                    },
                    {
                        $and: [
                        { male: false, female: false },
                        {
                            $or: [
                            {
                                trainer: {
                                $elemMatch: {
                                    name,
                                    unknownHundo: { $in: [null, false] }
                                }
                                }
                            },
                            { 'trainer.name': { $ne: name } }
                            ]
                        }
                        ]
                    }
                ]
            }
        }else{
            let releaseFn = 'release'
            if(cfg.dexField == 'shinyDex'){
                releaseFn = 'releaseShiny';
            }
            return {
                ...base,
                [releaseFn]: true,
                [cfg.dexField]: true,
                // trade: { $nin: [ null, false ] },
                $or:[
                    {trainer: {$elemMatch: {
                        name: {$eq: name},
                        [cfg.trainerField]: {$in: [null, false]}
                    }}},
                    {'trainer.name': {$ne: name}}
                ]
            }
        }
    }

  // --------------------------------------------------
  // BUILD HAVE FILTER
  // --------------------------------------------------

      static buildHaveFilter(name: string, cfg: any) {
        const base = {

        }
        if (cfg.gender) {
            const g = cfg.gender;
            return {
            ...base,
                release: true,
                // trade: { $nin: [ null, false ] },
                region: cfg.region?.query,
                shadow: { $nin: [true] },
                costume: { $exists: false },
                dmax: { $nin: [true] },
                megaDex: { $nin: [true] },
                gmaxDex: { $nin: [true] },
                $or: [
                    {
                        $and: [
                        { [g]: true },
                        {
                            $or: [
                            {
                                trainer: {
                                $elemMatch: {
                                    name,
                                    [`${g}Hundo`]: true
                                }
                                }
                            },
                            { 'trainer.name': { $ne: name } }
                            ]
                        }
                        ]
                    },
                    {
                        $and: [
                        { male: false, female: false },
                        {
                            $or: [
                            {
                                trainer: {
                                $elemMatch: {
                                    name,
                                    unknownHundo: true
                                }
                                }
                            },
                            { 'trainer.name': { $ne: name } }
                            ]
                        }
                        ]
                    }
                ]
            }
        } else {
            let releaseFn = 'release'
            if(cfg.dexField == 'shinyDex'){
                releaseFn = 'releaseShiny';
            }
            return {
                [releaseFn]: true,
                [cfg.dexField]: true,
                // trade: { $nin: [ null, false ] },
                trainer: {
                    $elemMatch: {
                        name: {$eq: name},
                        [cfg.trainerField]: true
                    }
                }
            }
        }
    }

  // --------------------------------------------------
  // EXPAND DEX GROUPS
  // --------------------------------------------------
  static expandDexGroups(groups: string[]): number[] {
    const out: number[] = [];
    groups.forEach(g => g?.split(',').forEach(x => out.push(Number(x))));
    return [...new Set(out)];
  }

  // --------------------------------------------------
  // COMPUTE WANT / HAVE
  // --------------------------------------------------
  static async computeWant(name: string, cfg: any){
    const docs = await Pokemon.find(
        this.buildWantFilter(name, cfg),
        '_id dexGroup'
    ).sort({ dex: 1 });
    const groups = [...new Set(docs.map(d => d.dexGroup).filter((g): g is string => g !== undefined))];
    return this.expandDexGroups(groups);
  }

  static async computeHave(name: string, cfg: any) {
    const docs = await Pokemon.find(
      this.buildHaveFilter(name, cfg),
      '-_id dex'
    ).sort({ dex: 1 });
    return [...new Set(docs.map(d => d.dex))];
  }

  // --------------------------------------------------
  // MAIN ENTRY POINT
  // --------------------------------------------------

  static async run(trainer: string, search: 'want' | 'have', cfg: any){
    let want = await this.computeWant(trainer, cfg)
    let have = await this.computeHave(trainer, cfg)
    console.log('want', want);
    console.log('have', have);
    const result =
      search === 'want'
        ? want
        : have.filter(x => !want.includes(x));

    return result.length ? result.join(',') : 'EMPTY';
  }
}