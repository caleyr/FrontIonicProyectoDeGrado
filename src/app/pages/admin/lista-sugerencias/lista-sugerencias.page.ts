import { Component, OnInit } from '@angular/core';
import { Comments } from '../../../model/Comments';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';
import { AlertController } from '@ionic/angular';
import { User } from '../../../model/User';
@Component({
  selector: 'app-lista-sugerencias',
  templateUrl: './lista-sugerencias.page.html',
  styleUrls: ['./lista-sugerencias.page.scss'],
})
export class ListaSugerenciasPage implements OnInit {

  id = null;
  listaComentario : Comments[] = null;

  constructor(
    private apiService : ApiService,
    private userService : UserService,
    private alertController : AlertController
  ) { }

  ngOnInit(){
    this.userService.obtenerListaUsuario().subscribe(data=>{
      if(data.status === 200){
        this.admin(data.data).then(data=>{
          this.id = data;          
          this.cargarDatosId();
        });
      }
    })
  }

  admin(data : User[]){
    return new Promise((resolve, rejects)=>{
      for (let index = 0; index < data.length; index++) {
        if(data[index].email === this.apiService.emailUser){
          resolve(data[index].id);
        }
      }
    });    
  }

  cargarDatosId(){
    this.userService.obtenerListaComentario(this.id).subscribe(data=>{
      if(data.status === 200){
        this.listaComentario = data.data;
      }
    });
  }

  async eliminarNotifiaciones() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: 'Desea eliminar todas las sugerencias.',
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
            this.listaComentario = [];
          }
        }
      ]
    });
    await alert.present();
  }

  doRefresh(event){
    setTimeout(()=>{
      this.listaComentario = null;
      this.cargarDatosId();
      event.target.complete();
    }, 500);
  }
}
