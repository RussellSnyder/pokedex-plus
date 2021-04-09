import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { PokemonDetailComponent } from './features/pokemon-detail/pokemon-detail.component';
import { PokemonOverviewComponent } from './features/pokemon-overview/pokemon-overview.component';
import { PokedexTopLevelRoute as PokedexTopLevelRoutePath, PokemonSubRoutes } from './models/routes';

export const TopLevelRoutes: Routes = [
  {
    path: PokedexTopLevelRoutePath.Home, //
    redirectTo: PokedexTopLevelRoutePath.Pokemon,
    pathMatch: 'full',
  },
  {
    path: PokedexTopLevelRoutePath.Pokemon,
    component: PokemonOverviewComponent,
    pathMatch: 'full',
  },
  {
    path: `${PokedexTopLevelRoutePath.Pokemon}/:${PokemonSubRoutes.DetailParam}`,
    component: PokemonDetailComponent,
  },
  {
    path: PokedexTopLevelRoutePath.NotFound,
    component: NotFoundComponent,
  },
  {
    path: '**', // Catch all
    redirectTo: PokedexTopLevelRoutePath.NotFound,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(TopLevelRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
