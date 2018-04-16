import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject'; 
import { HttpClient,HttpParams } from '@angular/common/http';
@Injectable()
export class ClickmapService {
  private subject=new Subject<any>();
  private dummyarray:any[]=[];
  private response:any;
  private url="http://street-asset-manager-api.herokuapp.com/v1/all/";
  constructor(private http:HttpClient) {
    this.dummyarray.push({
      "cam_name":"cam1",
      "city": "Chigaco",
      "country": "US",
      "lat": "41.94",
      "long": "-87,65",
      "source": "/fecnetwork/13661.flv/playlist.m3u8",
      "img": "http://static.earthcam.com/cams/includes/images/offline_images/Wrigley_HD1.jpg"
    });
    this.dummyarray.push({
      "cam_name":"cam2",
      "city": "New Orlens",
      "country": "US",
      "lat": "29.98",
      "long": "-90,06",
      "source": "/fecnetwork/4282.flv/playlist.m3u8",
      "img": "http://static.earthcam.com/cams/includes/images/offline_images/nola-balc-offline-1.jpg"
    });
   
    this.dummyarray.push({
      "cam_name":"cam3",
      "city": "New Orleans",
      "country": "US",
      "lat": "29.98",
      "long": "-90.06",
      "source": "/fecnetwork/4281.flv/playlist.m3u8",
      "img": "http://static.earthcam.com/cams/includes/images/offline_images/Karoake1_new.jpg"
    });
 
    this.dummyarray.push({
      "cam_name":"cam4",
      "city": "Las Vegas",
      "country": "US",
      "lat": "30.08",
      "long": "-115.17",
      "source": "/fecnetwork/eclasvegas.flv/playlist.m3u8",
      "img": "http://static.earthcam.com/cams/includes/images/offline_images/Vegas2.jpg"
    });
    this.http.get(this.url,{
      params:new HttpParams().set('category','camera')
    }).subscribe(response=>{
      this.response=response;
    });
   }
   updateList(){
     this.subject.next(this.response);
     console.log(this.response);
   }
   getUpdatedList():Observable<any>{
     return this.subject.asObservable();
   }
}
