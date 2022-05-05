import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { DireccionUrl } from 'src/app/model/DireccionUrl';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-opciones-direccion',
  templateUrl: './opciones-direccion.page.html',
  styleUrls: ['./opciones-direccion.page.scss'],
})
export class OpcionesDireccionPage implements OnInit {

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
    this.presentAlert('Desea eliminar la Direccion.');
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
