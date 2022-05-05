import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController, ModalController } from '@ionic/angular';
import { CollectionPoint } from 'src/app/model/CollectionPoint';
import { PuntoRecoleccionService } from 'src/app/services/punto-recoleccion.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { AgregarComentarioPage } from './agregar-comentario/agregar-comentario.page';

@Component({
  selector: 'app-lista-recoleccion-residente',
  templateUrl: './lista-recoleccion-residente.page.html',
  styleUrls: ['./lista-recoleccion-residente.page.scss'],
})
export class ListaRecoleccionResidentePage implements OnInit {

  id : any;

  listaPuntosEspera: CollectionPoint[] = [];
  listaPuntosActivo: CollectionPoint[] = [];
  listaPuntosFinalizado: CollectionPoint[] = [];
  segment = 0;  
  contador = 0; 

  suscripcion : Subscription;
  
 @ViewChild('slides', { static: true }) slider: IonSlides;   

  constructor(
    private puntoRecoleccion : PuntoRecoleccionService,
    private userService : UserService,
    private apiService : ApiService,
    private alertController : AlertController,
    private modalController: ModalController,
  ) {
    this.userService.obtenerInfoResidente(this.apiService.emailUser).subscribe(data =>{
      this.id = data.data.id;      
      this.cargarLista();
    });
  }

  ngOnInit() {
    this.suscripcion = this.puntoRecoleccion.refresh$.subscribe(() =>{
      this.cargarLista();
    })
  }

  async segmentoCambiado() {
    await this.slider.slideTo(this.segment);
  }

  async sliderCambiado() {
    this.segment = await this.slider.getActiveIndex();
  }

  cargarLista(event?){
    this.contador = 0;
    this.puntoRecoleccion.listaPaginadaResidente(this.contador, 10, this.id ,"Espera").subscribe(data => {
      this.listaPuntosEspera = data.data.records;
    });
    this.puntoRecoleccion.listaPaginadaResidente(this.contador, 10, this.id, "Activo").subscribe(data => {
      this.listaPuntosActivo = data.data.records;
      console.log(this.listaPuntosActivo);      
    });
    this.puntoRecoleccion.listaPaginadaResidente(this.contador, 10, this.id, "Finalizado").subscribe(data => {
      this.listaPuntosFinalizado = data.data.records;
    });
  }

  cargarPageE(event){
    this.contador++;
    setTimeout(() => {      
      this.puntoRecoleccion.listaPaginada(this.contador, 10, "Espera").subscribe(data => {      
        this.listaPuntosEspera = this.listaPuntosEspera.concat(data.data.records);
        if(this.listaPuntosEspera.length == data.data.numberOfRecords){          
          event.target.disabled = true;
        }else{
          event.target.complete();
        }
      });
    }, 500);
  }

  cargarPageA(event){    
    this.contador++;
    setTimeout(() => {      
      this.puntoRecoleccion.listaPaginada(this.contador, 10, "Activo").subscribe(data => {      
        this.listaPuntosActivo = this.listaPuntosActivo.concat(data.data.records);
        if(this.listaPuntosActivo.length == data.data.numberOfRecords){          
          event.target.disabled = true;
        }else{
          event.target.complete();
        }
      });
    }, 500);
  }

  cargarPageF(event){    
    this.contador++;
    setTimeout(() => {      
      this.puntoRecoleccion.listaPaginada(this.contador, 10, "Finalizo").subscribe(data => {      
        this.listaPuntosFinalizado = this.listaPuntosFinalizado.concat(data.data.records);
        if(this.listaPuntosFinalizado.length == data.data.numberOfRecords){          
          event.target.disabled = true;
        }else{
          event.target.complete();
        }
      });
    }, 500);
  }

  async presentAlert(mensaje : string, id : any) {
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
            this.puntoRecoleccion.eliminarPunto(id).subscribe();
          }
        }        
      ]
    });
    await alert.present();
  }

  async modalComentario(id){
    const modal = await this.modalController.create({
      component: AgregarComentarioPage,
      componentProps:{
        id
      },
      cssClass: 'comentario_modal'
    })
    await modal.present();
  }

  doRefresh(event){
    setTimeout(()=>{
      this.cargarLista();
      event.target.complete();
    }, 500);
  }
}
