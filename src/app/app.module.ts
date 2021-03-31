import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonOverviewComponent } from './features/pokemon-overview/pokemon-overview.component';
import { PokemonDetailComponent } from './features/pokemon-detail/pokemon-detail.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonOverviewComponent,
    PokemonDetailComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [PokemonOverviewComponent]
})
export class AppModule { }
