import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonOverviewComponent } from './features/pokemon-overview/pokemon-overview.component';
import { PokemonDetailComponent } from './features/pokemon-detail/pokemon-detail.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { PokedexApiService } from './services/pokedex-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PokedexNavigationComponent } from './pokedex-navigation/pokedex-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSliderModule} from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { LoadingComponent } from './shared/loading/loading.component';
import { PokemonPreviewComponent } from './shared/pokemon-preview/pokemon-preview.component';
import { PokemonNavigatorService } from './services/pokemon-navigator';
import { PokemonSpriteGalleryComponent } from './features/pokemon-detail/pokemon-sprite-gallery/pokemon-sprite-gallery.component';
import { PokemonSpriteGalleryImageCardComponent } from './features/pokemon-detail/pokemon-sprite-gallery/pokemon-sprite-gallery-image-card/pokemon-sprite-gallery-image-card.component';
import { PokemonDetailHomeComponent } from './features/pokemon-detail/pokemon-detail-home/pokemon-detail-home.component';
import { PokemonStatsComponent } from './shared/pokemon-stats/pokemon-stats.component';
import { PokemonNomralizedStatsComponent } from './shared/pokemon-normalized-stats/pokemon-normalized-stats.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { QueryParamService } from './services/query-param.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonOverviewComponent,
    PokemonDetailComponent,
    NotFoundComponent,
    PokedexNavigationComponent,
    LoadingComponent,
    PokemonPreviewComponent,
    PokemonSpriteGalleryComponent,
    PokemonSpriteGalleryImageCardComponent,
    PokemonDetailHomeComponent,
    PokemonStatsComponent,
    PokemonNomralizedStatsComponent,
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatTabsModule,
    HighchartsChartModule,
  ],
  providers: [PokedexApiService, PokemonNavigatorService, QueryParamService],
  bootstrap: [AppComponent],
  exports: [PokemonOverviewComponent]
})
export class AppModule { }
