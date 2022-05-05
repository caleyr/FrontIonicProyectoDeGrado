import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { Comments } from '../../../model/Comments';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
const NOTIFICATION = 'notify';

@Component({
  selector: 'app-ver-comentario-reciclador',
  templateUrl: './ver-comentario-reciclador.page.html',
  styleUrls: ['./ver-comentario-reciclador.page.scss'],
})
export class VerComentarioRecicladorPage implements OnInit {

  id = null;
  listaComentario : Comments[] = [];
  suscripcion : Subscription;

  constructor(
    private apiService : ApiService,
    private userService : UserService,
    private alertController : AlertController
  ) { }

  ngOnInit(){
    this.suscripcion = this.userService.refreshComment$.subscribe(() =>{      
      this.cargarDatosId();
    })
    this.cargarDatosId();
  }

  cargarDatosId(){
    this.userService.obtenerInfoReciclador(this.apiService.emailUser).subscribe(data =>{      
      this.id = data.data.user.id;
      this.userService.obtenerListaComentario(this.id).subscribe(data=>{
        if(data.status === 200){
          this.listaComentario = data.data;
        }
      })
    });
  }

  async eliminarNotifiaciones() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: 'Desea eliminar todas las notificaciones.',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.userService.eliminarComentario(this.id).subscribe();
            Storage.set({key: NOTIFICATION, value: '0'});
            this.listaComentario = [];
          }
        }
      ]
    });
    await alert.present();
  }

}
