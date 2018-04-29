import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the DronePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drone',
  templateUrl: 'drone.html',
})
export class DronePage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private screenOrientation: ScreenOrientation, private blueSerial: BluetoothSerial,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

    // set to landscape
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  on() {
    this.blueSerial.isConnected().then(success => {
      this.blueSerial.write('1').then(success => {
        this.showToast('Lights ON');
      }, err => {
        console.log('ON', err);
        this.showToast('Unable to Send Data');
      })
    }, err => {
      console.log('ON Device', err);
      this.showToast('Device is not Connected');
    })
  }

  off() {
    this.blueSerial.isConnected().then(success => {
      this.blueSerial.write('0').then(success => {
        this.showToast('Lights OFF');
      }, err => {
        console.log('OFF', err);
        this.showToast('Unable to Send Data');
      })
    }, err => {
      console.log('ON Device', err);
      this.showToast('Device is not Connected');
    })
  }

  private showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    })

    toast.present();
  }

}
