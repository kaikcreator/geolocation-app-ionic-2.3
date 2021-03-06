import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [GoogleMaps, Geolocation]
})
export class MapPage {

  public map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public googleMaps: GoogleMaps, private platform: Platform, private geolocation: Geolocation) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.platform.ready().then(()=>{
      this.googleMaps.isAvailable().then(()=>{
        let element: HTMLElement = document.getElementById('map');
        this.map = this.googleMaps.create(element);
        this.map.one(GoogleMapsEvent.MAP_READY).then((data:any)=>{
          //let's center map based on our position
          this.geolocation.getCurrentPosition().then(pos => {
            let myPosition = new LatLng(pos.coords.latitude, pos.coords.longitude);
            this.map.animateCamera({target: myPosition,zoom: 10});
            this.map.addMarker({
              position: myPosition,
              title: 'You are here'
            });
          })
        })
      }).catch(()=>alert("GoogleMap is not available"));
    })
  }

}
