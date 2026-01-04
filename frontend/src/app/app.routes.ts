import { Routes } from '@angular/router';
import { Index } from './post/index';
import { Create } from './post/create/create';
import { Edit } from './post/edit/edit';
import { Show } from './post/show/show';
import { Home } from './default/home/home';
import { PokemonIndex } from './pokemon/pokemon-index/pokemon-index';
import { PokemonTrash } from './pokemon/pokemon-trash/pokemon-trash';
import { PageTest } from './default/page-test/page-test';
//import { TradeMike } from './pokemon/trade-mike/trade-mike';
import { All } from './pokemon/all/all';
import { MainDex } from './pokemon/main-dex/main-dex';
import { ShinyDex } from './pokemon/shiny-dex/shiny-dex'
import { LuckyDex } from './pokemon/lucky-dex/lucky-dex'
import { XxlDex } from './pokemon/xxl-dex/xxl-dex'
import { XxsDex } from './pokemon/xxs-dex/xxs-dex'
import { TrainerList } from './trainer/trainer-list/trainer-list'
import { TrainerIndex } from './trainer/trainer-index/trainer-index'; 
import { TradeIndex } from './trade/trade-index/trade-index';
import { TrashIndex } from './trash/trash-index/trash-index';
import { TrashHundo } from './trash/trash-hundo/trash-hundo';
import { TrainerMenu } from './trainer/trainer-menu/trainer-menu'
import { TrainerHundo } from './trainer/trainer-hundo/trainer-hundo'
import { TrainerBelgthor} from './trainer/trainer-belgthor/trainer-belgthor'
import { TradeMenu } from './trade/trade-menu/trade-menu'
import { TrainerXxl } from './trainer/trainer-xxl/trainer-xxl';
import { TrainerXxs } from './trainer/trainer-xxs/trainer-xxs';
import { TradeMike } from './trade/trade-mike/trade-mike';
import { TradeMikki } from './trade/trade-mikki/trade-mikki';
import { TradeDarryl } from './trade/trade-darryl/trade-darryl';
import { TradeJanice } from './trade/trade-janice/trade-janice';
import { TradeView } from './trade/trade-view/trade-view';
import { TrainerCostume } from './trainer/trainer-costume/trainer-costume';
import { TradeViewCostume } from './trade/trade-view-costume/trade-view-costume';
import { TrainerShiny } from './trainer/trainer-shiny/trainer-shiny'
import { TrainerLucky } from './trainer/trainer-lucky/trainer-lucky'
import { TradeViewLucky } from './trade/trade-view-lucky/trade-view-lucky'
import { TradeViewPerfect } from './trade/trade-view-perfect/trade-view-perfect'
import { TrainerPerfect } from './trainer/trainer-perfect/trainer-perfect'
import { TrainerDex } from './trainer/trainer-dex/trainer-dex';
import { TradeDex } from './trade/trade-dex/trade-dex'
import { authGuard } from './auth.guard'; 
import { BoardUser } from './auth/board-user/board-user';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChangePassword } from './pages/change-password/change-password';


export const routes: Routes = [
    { path: '', component: Home},

    { path: 'test', component: PageTest},

    { path: 'posts', component: Index},
    { path: 'posts/create', component: Create},
    { path: 'posts/:postId/edit', component: Edit},
    { path: 'posts/:postId', component: Show},

    { path: 'auth', component:  NavBarComponent},
  { path: 'auth/login', component:  Login},
  { path: 'auth/changepw', component: ChangePassword,
    canActivate: [authGuard] },
  { path: 'auth/register', component: Register,
    canActivate: [authGuard] },
  {
    path: 'auth/dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },


    { path: 'pokemon', component: PokemonIndex},
    { path: 'pokemon/all', component: All},
    { path: 'pokemon/main', component: MainDex},
    { path: 'pokemon/shiny', component: ShinyDex},
    { path: 'pokemon/lucky', component: LuckyDex},
    { path: 'pokemon/xxl', component: XxlDex},
    { path: 'pokemon/xxs', component: XxsDex},
    // { path: 'pokemon/trash', component: PokemonTrash},
    // { path: 'pokemon/trade/mike', component: TradeMike},

    { path: 'trainer', component: TrainerList, canActivate: [authGuard]},
    { path: 'trainer/:name', component: TrainerMenu, canActivate: [authGuard]},
    { path: 'trainer/:name/hundo', component: TrainerDex, canActivate: [authGuard]},
    { path: 'trainer/:name/xxl', component: TrainerDex, canActivate: [authGuard]},
    { path: 'trainer/:name/xxs', component: TrainerDex, canActivate: [authGuard]},
    { path: 'trainer/:name/costume', component: TrainerDex, canActivate: [authGuard]},
    { path: 'trainer/:name/shiny', component: TrainerDex, canActivate: [authGuard]},
    { path: 'trainer/:name/lucky', component: TrainerDex, canActivate: [authGuard]},
    { path: 'trainer/:name/perfect', component: TrainerDex, canActivate: [authGuard]},
    // { path: 'trainer/:name/:dex', component: TrainerDex},

    { path: 'trade', component: TrainerList},
    { path: 'trade/Belgthor', component: TradeMike},
    { path: 'trade/Missiroze', component: TradeMikki},
    { path: 'trade/darrylneufeld', component: TradeDarryl},
    { path: 'trade/S3RAfinaP', component: TradeJanice},
    { path: 'trade/:name', component: TradeMenu},
    { path: 'trade/:name/shiny', component: TradeDex },
    { path: 'trade/:name/perfect', component: TradeDex },
    { path: 'trade/:name/lucky', component: TradeDex },
    { path: 'trade/:name/view/costume', component: TradeViewCostume},
    { path: 'trade/:name/view/lucky', component: TradeViewLucky},
    { path: 'trade/:name/view/perfect', component: TradeViewPerfect},
    { path: 'trade/:name/view/:dex', component: TradeView},

    { path: 'trash', component: TrashIndex},
    { path: 'trash/hundo', component: TrashHundo},

    { path: '**', redirectTo: ''},
];
