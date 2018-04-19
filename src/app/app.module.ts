import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone} from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { MapComponentComponent } from './components/map-component/map-component.component';
import { GridviewComponent } from './components/gridview/gridview.component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { PlaystreamService } from './services/playstream.service';
import { ClickmapService } from './services/clickmap.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent,
    GridviewComponent,
    NavbarComponent,
    VideoplayerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    DragScrollModule,
    HttpClientModule
    
  ],
  providers: [PlaystreamService,ClickmapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
