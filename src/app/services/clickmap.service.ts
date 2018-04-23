import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject'; 
import { HttpClient,HttpParams } from '@angular/common/http';
import { icon,marker } from 'leaflet';
import { PlaystreamService } from './playstream.service';
@Injectable()
export class ClickmapService {
  private subject=new Subject<any>();
  private criteriasubject= new Subject<string>();
  private listofcam:any;
  private markers:any[]=[];
  private test:any[]=[];
  private url="http://street-asset-manager-api.herokuapp.com/v1/all/status=ACTIVE";
  constructor(private http:HttpClient,private play:PlaystreamService) {
    this.http.get(this.url).subscribe(response=>{
      this.listofcam=response;
      for(let cam of this.listofcam){
        if(cam.location) {
        this.markers.push( marker([cam.location.x,cam.location.y],{
         icon: icon({
           iconSize: [ 25, 41 ],
           iconAnchor: [ 13, 41 ],
           iconUrl: 'assets/marker-icon.png',
           shadowUrl: 'assets/marker-shadow.png'
        })
       }).bindPopup("<div align='center'><img src="+cam.specificProperties.image+" width=100 height=100></img><p style='font-size:18px;font-weight:bold'>"+cam.tags[2]+"</p></div>")
         .on('click',<LeafletMouseEvent>(e)=>{
         this.play.setSource("http://videos3.earthcam.com"+cam.specificProperties.source);
       }));}
      }
    });
   }
   updateList(criteria:string){
    let url="http://street-asset-manager-api.herokuapp.com/v1/all/search";
    let Params = new HttpParams();
    Params=Params.append('q',criteria);
    //console.log(encodeURI(criteria));
    //Params=Params.append('category','camera');
    this.http.get(url,{
      params:Params
    }).subscribe(response=>{
     this.listofcam=response;
     let url="http://api.geonames.org/findNearbyPlaceNameJSON";
     let temp:any;
        for(let cam of this.listofcam){
          let Params = new HttpParams();
          Params=Params.append('lat',cam.location.x);
          Params=Params.append('lng',cam.location.y);
          Params=Params.append('username','xhesina');
         // console.log(cam.location.x+" "+cam.location.y);
          this.http.get(url,{
              params:Params
      
          }).subscribe(response=>{
              temp={
                'apirefat': cam,
                'api2':response
              }
              this.test.push(temp);
              this.play.setSource("http://videos3.earthcam.com"+temp.apirefat.specificProperties.source)
          });
        }
        this.subject.next(this.test);
  
    });
    this.test=[];
    this.criteriasubject.next(criteria);
   }
  //  testSearch(polygon:any){
  //    let urltest="http://street-asset-manager-api.herokuapp.com/v1/all/search/geography";
  //    this.http.post(urltest,{
  //      params: new HttpParams().set('area',JSON.stringify(polygon)),
  //      headers:{'Content-Type': 'application/json'}
  //    },).subscribe(response=>{
  //    // console.log(response);
  //     console.log(JSON.stringify(polygon));
  //   });
  //  }
   getUpdatedList():Observable<any>{
     return this.subject.asObservable();
   }
   getCriteria():Observable<any>{
     return this.criteriasubject.asObservable();
   }
   addMarkers():any[]{
     return this.markers;
   }
}
