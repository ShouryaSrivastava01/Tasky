import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toastController: ToastController) { }

  async presentToastForSuccess(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentToastForWarning(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }

  async presentToastForError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
