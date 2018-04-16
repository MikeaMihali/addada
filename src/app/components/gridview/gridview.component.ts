import { Component, OnInit,ViewChild } from '@angular/core';
import { DragScrollDirective } from 'ngx-drag-scroll';
import { PlaystreamService } from '../../services/playstream.service';
import { ClickmapService } from '../../services/clickmap.service';
import { HttpClient,HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent implements OnInit {
listofcam:any[];
selected:any;
@ViewChild('nav', {read: DragScrollDirective}) ds: DragScrollDirective;
  
  moveLeft() {
    this.ds.moveLeft();
  }
 
  moveRight() {
    this.ds.moveRight();
  }
  constructor(private service:PlaystreamService,private updateservice:ClickmapService,private http:HttpClient) { 
      this.updateservice.getUpdatedList().subscribe(list=>{
        this.listofcam=list;
      })
  }
  selectCam(cam:any){
    this.service.setSource("http://videos3.earthcam.com"+cam.specificProperties.source);
    this.selected=cam;
    // this.isselect=true;
  }
  getCity(x:string,y:string){
    let url="https://nominatim.openstreetmap.org/reverse";
    let Params = new HttpParams();
    Params=Params.append('format','jsonv2');
    Params=Params.append('lat',x);
    Params=Params.append('lon',y);
    this.http.get(url,{
        params:Params

    }).subscribe(response=>{
      console.log(response);
    })
    
  }
  getCountry(x:string,y:string){
    return "kjo eshte prove"+x+y;
  }
  ngOnInit() {
  }
}
