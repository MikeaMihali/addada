import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject'; 
@Injectable()
export class PlaystreamService {
 
  private subject = new Subject<any>();
  constructor() { }
  setSource(message:string){
    this.subject.next(
      message
    );
  }
  getSource():Observable<any>{
    return this.subject.asObservable();
  }

}
