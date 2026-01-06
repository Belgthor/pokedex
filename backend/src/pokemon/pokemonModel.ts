import mongoose, { Schema, Document, Model } from 'mongoose';

// --------------------------------------------------
// TRAINER SUBDOCUMENT TYPE
// --------------------------------------------------
export interface IPokemonTrainer {
  name?: string;
  shiny?: boolean;
  perfect?: boolean;
  lucky?: boolean;
  xxl?: boolean;
  xxs?: boolean;
  mega?: boolean;
  dmax?: boolean;
  gmax?: boolean;
  shadow?: boolean;
  purified?: boolean;
  maleHundo?: boolean;
  femaleHundo?: boolean;
  unknownHundo?: boolean;
  costume?: boolean;
}

const TrainerSchema = new Schema<IPokemonTrainer>(
  {
    name: { type: String, required: true },
    shiny: { type: Boolean },
    perfect: { type: Boolean },
    lucky: { type: Boolean },
    xxl: { type: Boolean },
    xxs: { type: Boolean },
    mega: { type: Boolean },
    dmax: { type: Boolean },
    gmax: { type: Boolean },
    shadow: { type: Boolean },
    purified: { type: Boolean },
    maleHundo: { type: Boolean },
    femaleHundo: { type: Boolean },
    unknownHundo: { type: Boolean },
    costume: { type: Boolean }
  },
  { _id: false }
);

// --------------------------------------------------
// MAIN POKÉMON TYPE
// --------------------------------------------------
export interface IPokemon extends Document {
  dex: number;
  dexGroup: string;
  name: string;
  candy: string;
  region:
    | 'KANTO'
    | 'JOHTO'
    | 'HOENN'
    | 'SINNOH'
    | 'UNOVA'
    | 'KALOS'
    | 'ALOLA'
    | 'GALAR'
    | 'HISUI'
    | 'PALDEA'
    | 'UNIDENTIFIED';

  evolution: number;
  male: boolean;
  female: boolean;
  trade: boolean;
  release: boolean;
  releaseShiny: boolean;
  releaseDate?: Date;
  releaseShinyDate?: Date;

  form?: string;
  formName?: string;
  formNumber?: number;

  costume?: string;
  costumeName?: string;
  costumeNumber?: number;

  image: string;
  imageShiny: string;

  mainDex?: boolean;
  shinyDex?: boolean;
  perfectDex?: boolean;
  luckyDex?: boolean;
  xxlDex?: boolean;
  xxsDex?: boolean;
  shadowDex?: boolean;
  purifiedDex?: boolean;
  megaDex?: boolean;
  gmaxDex?: boolean;

  shadow?: boolean;
  dmax?: boolean;
  mega?: boolean;

  trainer: IPokemonTrainer[];
}

// --------------------------------------------------
// MAIN SCHEMA
// --------------------------------------------------
const PokemonSchema = new Schema<IPokemon>({
  dex: { type: Number, required: true },
  dexGroup: { type: String, required: true },

  name: { type: String, required: true, uppercase: true },
  candy: { type: String, required: true, uppercase: true },

  region: {
    type: String,
    required: true,
    uppercase: true,
    enum: [
      'KANTO',
      'JOHTO',
      'HOENN',
      'SINNOH',
      'UNOVA',
      'KALOS',
      'ALOLA',
      'GALAR',
      'HISUI',
      'PALDEA',
      'UNIDENTIFIED'
    ]
  },

  evolution: { type: Number, required: true },
  male: { type: Boolean, required: true },
  female: { type: Boolean, required: true },
  trade: { type: Boolean, required: true },
  release: { type: Boolean, required: true },
  releaseShiny: { type: Boolean, required: true },
  releaseDate: { type: Date },
  releaseShinyDate: { type: Date },

  form: { type: String },
  formName: { type: String },
  formNumber: { type: Number },

  costume: { type: String },
  costumeName: { type: String },
  costumeNumber: { type: Number },

  image: { type: String, required: true },
  imageShiny: { type: String, required: true },

  mainDex: { type: Boolean },
  shinyDex: { type: Boolean },
  perfectDex: { type: Boolean },
  luckyDex: { type: Boolean },
  xxlDex: { type: Boolean },
  xxsDex: { type: Boolean },
  shadowDex: { type: Boolean },
  purifiedDex: { type: Boolean },
  megaDex: { type: Boolean },
  gmaxDex: { type: Boolean },

  shadow: { type: Boolean },
  dmax: { type: Boolean },
  mega: { type: Boolean },

  trainer: {
    type: [TrainerSchema],
    default: []
  }
});

// --------------------------------------------------
// MODEL EXPORT
// --------------------------------------------------
const Pokemon = mongoose.model<IPokemon>('Pokemon', PokemonSchema) as Model<IPokemon>;

export default Pokemon;