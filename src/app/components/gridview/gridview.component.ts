import { Component, OnInit,ViewChild} from '@angular/core';
import { DragScrollDirective } from 'ngx-drag-scroll';
import { PlaystreamService } from '../../services/playstream.service';
import { ClickmapService } from '../../services/clickmap.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent implements OnInit{
private response:any[];
private criteria:string;
// private listofcam:any[];
// private listofcity:any[];
private selected:any;
@ViewChild('nav', {read: DragScrollDirective}) ds: DragScrollDirective;
  
  moveLeft() {
    this.ds.moveLeft();
  }
 
  moveRight() {
    this.ds.moveRight();
  }
  constructor(private service:PlaystreamService,private updateservice:ClickmapService) { 
   
  }
  selectCam(i:number){
    this.service.setSource("http://videos3.earthcam.com"+this.response[i].apirefat.specificProperties.source);
    this.selected={
      'city':this.response[i].api2.geonames[0].name,
      'country':this.response[i].api2.geonames[0].countryName,
      'lat':this.response[i].apirefat.location.x,
      'long':this.response[i].apirefat.location.y,

    };
  }
  ngOnInit() {
    this.updateservice.getUpdatedList().subscribe( list=>{
      this.response=list;
      this.selected=null;
    // this.service.setSource("http://videos3.earthcam.com"+this.response[0].apirefat.specificProperties.source);              
    });
    this.updateservice.getCriteria().subscribe((criteria)=>{
      this.criteria=criteria;
    }); 
  }
}
