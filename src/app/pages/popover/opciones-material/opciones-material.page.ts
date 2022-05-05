import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-opciones-material',
  templateUrl: './opciones-material.page.html',
  styleUrls: ['./opciones-material.page.scss'],
})
export class OpcionesMaterialPage implements OnInit {

  @Input('id')id: number;

  constructor(
    public popover : PopoverController,
    private alertController : AlertController,
    private userService : UserService
  ) { }

  ngOnInit() {
  }

  eliminar(){
    this.popover.dismiss();
    this.presentAlert('Desea eliminar el material.');
  }

  async presentAlert(mensaje : string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
          }
        },
        {
          text: 'Confirmar',
          handler: (blah) => {
            this.userService.eliminarDireccion(this.id).subscribe();
          }
        }        
      ]
    });
    await alert.present();
  }

}
