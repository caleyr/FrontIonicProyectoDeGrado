import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../model/User';

@Component({
  selector: 'app-enviar-sugerencia',
  templateUrl: './enviar-sugerencia.page.html',
  styleUrls: ['./enviar-sugerencia.page.scss'],
})
export class EnviarSugerenciaPage implements OnInit {

  comentario = 
  {
    description : null,
    userId : null
  }

  constructor(
    public modalController : ModalController,
    private userService : UserService,
    private alertController : AlertController,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.userService.obtenerListaUsuario().subscribe(data=>{
      if(data.status === 200){
        this.admin(data.data).then(data=>{
          this.comentario.userId = data;
        });
      }
    })
  }

  admin(data : User[]){
    return new Promise((resolve, rejects)=>{
      for (let index = 0; index < data.length; index++) {
        if(data[index].role === 'Administrador'){
          resolve(data[index].id);
        }
      }
    });    
  }

  comentar(){
    if(this.comentario.description !== undefined){
      this.userService.crearComentario(this.comentario).subscribe(data=>{
        if(data.status === 201){
          this.mensaje('Se ha enviado tu solicitud.');          
        }else{
          this.mensaje('Error al enviar.');
        }
      });
    }
  }

  async mensaje(msj : any) {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: msj,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.back();
          }
        }
      ]
    });
    await alert.present();
  }

}
