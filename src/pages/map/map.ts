import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [GoogleMaps]
})
export class MapPage {

  public map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public googleMaps: GoogleMaps, private platform: Platform) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.platform.ready().then(()=>{
      this.googleMaps.isAvailable().then(()=>{
        let element: HTMLElement = document.getElementById('map');
        this.map = this.googleMaps.create(element);
        this.map.one(GoogleMapsEvent.MAP_READY).then((data:any)=>{
          //let's center map based on our position
          let myPosition: LatLng = new LatLng(41.390295, 2.154007);
          this.map.animateCamera({target: myPosition,zoom: 10});
        })
      }).catch(()=>alert("GoogleMap is not available"));
    })
  }

}
