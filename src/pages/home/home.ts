import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { adjustRendered } from 'ionic-angular/components/virtual-scroll/virtual-util';

//import { DronePage } from '../drone/drone'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  success: any; error: any; devices: any; unpaired: any;
  constructor(public navCtrl: NavController,
    private blueSerial: BluetoothSerial, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.blueSerial.isEnabled().then(res => {
      this.success = res;
      this.listPairedDevices();
      this.listUnpairedDevices();
    }, err => {
      this.error = err;
      this.showToast(err);
      if (err) {
        this.blueSerial.enable().then(res => {
          this.showToast('Bluetooth Enable!');
          this.listPairedDevices();
          this.listUnpairedDevices();
        }, err => {
          this.showToast('Error to Enable Bluetooth');
        })
      }
    })
  }

  change(){
    this.navCtrl.push('DronePage',{deviceName:'hello'});
  }

  listUnpairedDevices() {
    this.showToast('Starting to find Devices')
    this.blueSerial.discoverUnpaired().then(res => {
      this.unpaired = res;
    }, err => {
      this.showToast('Unable to Start Devices Discovery');
    })
    this.blueSerial.setDeviceDiscoveredListener().subscribe(res => {
      this.unpaired.push(res.name)
    });
  }

  connectDevice(address: any, name: any) {
    console.log(name);
    this.blueSerial.isConnected().then(res => {
      this.blueSerial.disconnect();


      this.blueSerial.connect(address).subscribe(res => {
        this.showToast('Connected to Device ' + name);
        this.navCtrl.push('DronePage',{deviceName:'hello'});
        
      }, err => {
        this.showToast('Error to connect to Bluetooth Device.')
      })

    }, err => {

      this.blueSerial.connect(address).subscribe(res => {
        this.showToast('Connected to Device ' + address);
        this.navCtrl.push('DronePage');
      }, err => {
        this.showToast('Error to connect to Bluetooth Device.')
      })
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

  private listPairedDevices() {
    this.blueSerial.list().then(res => {
      this.devices = res;
    }, err => {
      this.showToast('Error to list paired devices.')
    })
  }

}
