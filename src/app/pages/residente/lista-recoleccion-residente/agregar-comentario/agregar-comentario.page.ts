import { Component, OnInit, Input } from '@angular/core';
import { modalController } from '@ionic/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RutaService } from '../../../../services/ruta.service';
import { Comentario } from 'src/app/model/Comentario';
import { UserService } from '../../../../services/user.service';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.page.html',
  styleUrls: ['./agregar-comentario.page.scss'],
})
export class AgregarComentarioPage implements OnInit {

  @Input('id')id: number;
  comentario = 
  {
    description : null,
    userId : null
  }

  constructor(
    public modalController : ModalController,
    private rutaService : RutaService,
    private userService : UserService,
    private alertController : AlertController
  ) {
  }

  ngOnInit() {
  }

  comentar(){
    if(this.comentario.description !== undefined){
      this.rutaService.obtenerRuta(this.id).subscribe(data=>{
        if(data.status === 200){
          this.userService.obtenerReciclador(data.data.recycler).subscribe(data=>{   
            if(data.status ===200){
              this.comentario.userId = data.data.user.id;
              this.userService.crearComentario(this.comentario).subscribe(data=>{
                if(data.status === 201){
                  modalController.dismiss();
                  this.mensaje('Se ha enviado tu opinión al reciclador.');
                }else{
                  modalController.dismiss();
                  this.mensaje('Error al enviar.');
                }
              });
            }else{
              modalController.dismiss();
            }
          });
        }else{
          modalController.dismiss();
        }
      });
    }
  }

  async mensaje(msj : any) {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: msj,
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }
}
