import { Component, OnInit,AfterViewInit } from '@angular/core';
import { PlaystreamService } from '../../services/playstream.service';
import {Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit,AfterViewInit {
  videoJsplayer:any;
  constructor(private service:PlaystreamService) {
    this.service.getSource().subscribe(
        source =>{
          this.videoJsplayer.src({
          type:"application/x-mpegURL",
          src:source
          })
          this.videoJsplayer.play();
        }
        
    )
   }
  ngAfterViewInit(){
      this.videoJsplayer=videojs(document.getElementById("myvideo"))
  }
  ngOnInit() {
  }

}
declare var videojs;