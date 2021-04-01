import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { PokemonDetailComponent } from './features/pokemon-detail/pokemon-detail.component';
import { PokemonOverviewComponent } from './features/pokemon-overview/pokemon-overview.component';

export const PokedexTopLevelRoute = {
  Home: '',
  Pokemon: 'pokemon',
  NotFound: '404',
}

export const PokemonRoutes = {
  Detail: 'pokemon/:name'
}

export const TopLevelRoutes: Routes = [
  {
    path: PokedexTopLevelRoute.Home, //
    redirectTo: PokedexTopLevelRoute.Pokemon,
    pathMatch: 'full',
  },
  {
    path: PokedexTopLevelRoute.Pokemon,
    component: PokemonOverviewComponent,
    pathMatch: 'full',
  },
  {
    path: PokemonRoutes.Detail,
    component: PokemonDetailComponent,
  },
  {
    path: PokedexTopLevelRoute.NotFound,
    component: NotFoundComponent,
  },
  {
    path: '**', // Catch all
    redirectTo: PokedexTopLevelRoute.NotFound,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(TopLevelRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
