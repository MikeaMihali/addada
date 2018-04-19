import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject'; 
import { HttpClient,HttpParams } from '@angular/common/http';
import { icon,marker } from 'leaflet';
@Injectable()
export class ClickmapService {
  private subject=new Subject<any>();
  private listofcam:any;
  private address:any[]=[];
  private markers:any[]=[];
  private url="http://street-asset-manager-api.herokuapp.com/v1/all/category=camera";
  constructor(private http:HttpClient) {
    this.http.get(this.url).subscribe(response=>{
      this.listofcam=response;
      for(let cam of this.listofcam){
        this.markers.push( marker([cam.location.x,cam.location.y],{
         icon: icon({
           iconSize: [ 25, 41 ],
           iconAnchor: [ 13, 41 ],
           iconUrl: 'assets/marker-icon.png',
           shadowUrl: 'assets/marker-shadow.png'
        })
       }))
      }
    });
   }
   updateList(){
    this.http.get(this.url).subscribe(response=>{
      this.listofcam=response;
      this.subject.next(this.listofcam);
    });
   }
   testSearch(polygon:any){
     let urltest="http://street-asset-manager-api.herokuapp.com/v1/all/search/geography";
     this.http.post(urltest,{
       params: new HttpParams().set('area',JSON.stringify(polygon)),
       headers:{'Content-Type': 'application/json'}
     },).subscribe(response=>{
     // console.log(response);
      console.log(JSON.stringify(polygon));
    });
   }
   getUpdatedList():Observable<any>{
     return this.subject.asObservable();
   }
   addMarkers():any[]{
     return this.markers;
   }
}
