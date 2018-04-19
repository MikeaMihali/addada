import { Component, OnInit,ViewChild } from '@angular/core';
import { DragScrollDirective } from 'ngx-drag-scroll';
import { PlaystreamService } from '../../services/playstream.service';
import { ClickmapService } from '../../services/clickmap.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent implements OnInit {
listofcam:any[];
listofcity:any[]=[];
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
        let url="http://api.geonames.org/findNearbyPlaceNameJSON";
        for(let cam of this.listofcam){
          let Params = new HttpParams();
          Params=Params.append('lat',cam.location.x);
          Params=Params.append('lng',cam.location.y);
          Params=Params.append('username','xhesina');
          console.log(cam.location.x+" "+cam.location.y);
          this.http.get(url,{
              params:Params
      
          }).subscribe(response=>{
            console.log(response);
            this.listofcity.push(response);
          });
        }
        console.log(this.listofcity);
      });
  }
  selectCam(i:number){
    this.service.setSource("http://videos3.earthcam.com"+this.listofcam[i].specificProperties.source);
    this.selected={
      'city':this.listofcity[i].geonames[0].name,
      'country':this.listofcity[i].geonames[0].countryName,
      'lat':this.listofcam[i].location.x,
      'long':this.listofcam[i].location.y,

    };
    // this.isselect=true;
  }
  // getCity(){
   
    
  // }
  // getCountry(x:string,y:string){
  //   return "kjo eshte prove"+x+y;
  // }
  ngOnInit() {
  }
}
