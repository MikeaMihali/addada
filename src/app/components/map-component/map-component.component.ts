import { Component, ChangeDetectorRef ,style,OnInit, NgZone } from '@angular/core';
import * as L from 'leaflet';
import { Map ,geoJSON,Layer,LatLngBounds,control,latLng,tileLayer } from 'leaflet';
import { GeoJson } from './GeoJson';
import { ClickmapService } from '../../services/clickmap.service';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})

export class MapComponentComponent implements OnInit {
  googleMaps:any;
  options:any;
  fitBounds:any;
  constructor(private changedetector:ChangeDetectorRef,
              private clickservice:ClickmapService) {
  }

  ngOnInit() {
    this.googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      detectRetina: true
    });
   this.options = {
      layers: [ this.googleMaps],
      zoom: 7,
      center: latLng([ 41.1533, 20.1683 ])
    };
    //console.log(this.circle);
  }

  onEachFeature(feature,layer){
        let that=this;
        layer.on('click',<LeafletMouseEvent>(e)=>{
          that.fitBounds = e.target.getBounds();
          that.changedetector.detectChanges();
          that.clickservice.updateList();
        });
        layer.on('mouseover',<LeafletMouseEvent>(e)=>{
          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
          });
        });
        layer.on('mouseout',<LeafletMouseEvent>(e)=>{
          layer.setStyle({
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5,
            fillColor:'#ff7800'
          });
        });
  }

  onMapReady(map:L.Map) {
    L.geoJSON( GeoJson as any,
    {
      onEachFeature: this.onEachFeature.bind(this),
      style: () => ({ 
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5,
        fillColor:'#ff7800'
      })
    }
   ).addTo(map);
}
}
