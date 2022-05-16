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

  listaPuntosEspera: CollectionPoint[] = null;
  listaPuntosActivo: CollectionPoint[] = null;
  listaPuntosFinalizado: CollectionPoint[] = null;
  segment = 0;  
  
  contadorEspera = 0;
  contadorActivo = 0;
  contadorFinalizado = 0; 

  cantidadEspera = 0;
  cantidadActivo = 0;
  cantidadFinalizado = 0; 

  recargarEspera = false;
  recargarActivo = false;
  recargarFinalizado = false;  

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

  cargarLista(){
    this.puntoRecoleccion.listaPaginadaResidente(0, 10, this.id ,"Espera").subscribe(data => {
      this.listaPuntosEspera = data.data.records;
      this.cantidadEspera = data.data.numberOfRecords;
    });
    this.puntoRecoleccion.listaPaginadaResidente(0, 10, this.id, "Activo").subscribe(data => {
      this.listaPuntosActivo = data.data.records;
      this.cantidadActivo = data.data.numberOfRecords;
    });
    this.puntoRecoleccion.listaPaginadaResidente(0, 10, this.id, "Finalizado").subscribe(data => {
      this.listaPuntosFinalizado = data.data.records;
      this.cantidadFinalizado = data.data.numberOfRecords;
    });
  }

  listarPagina(contador, estado : string){
    this.puntoRecoleccion.listaPaginadaResidente(contador, 10, this.id, estado).subscribe(data => {
      if(estado === "Espera"){
        this.listaPuntosEspera = this.listaPuntosEspera.concat(data.data.records);
      }else if(estado === "Activo"){
        this.listaPuntosActivo = this.listaPuntosActivo.concat(data.data.records);
      }else if(estado === "Finalizado"){
        this.listaPuntosFinalizado = this.listaPuntosFinalizado.concat(data.data.records);
      }
    });
  }

  cargarPageE(event){    
    setTimeout(() => {
      this.contadorEspera++;
      if(this.listaPuntosEspera.length === this.cantidadEspera){     
        event.target.complete();     
        this.recargarEspera = true;
      }else{
        this.listarPagina(this.contadorEspera, "Espera");
        event.target.complete();
      }
    }, 500);
  }

  cargarPageA(event){    
    setTimeout(() => {
      this.contadorActivo++;
      if(this.listaPuntosActivo.length === this.cantidadActivo){     
        event.target.complete();     
        this.recargarActivo = true;
      }else{
        this.listarPagina(this.contadorActivo, "Activo");
        event.target.complete();
      }
    }, 500);
  }

  cargarPageF(event){    
    setTimeout(() => {
      this.contadorFinalizado++;
      if(this.listaPuntosFinalizado.length === this.cantidadFinalizado){        
        this.recargarFinalizado = true;
        event.target.complete();
      }else{
        this.listarPagina(this.contadorFinalizado, "Finalizado");
        event.target.complete();
      }
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
    this.listaPuntosEspera = null;
    this.listaPuntosActivo = null;
    this.listaPuntosFinalizado = null;
    this.contadorEspera = 0;
    this.contadorActivo = 0;
    this.contadorFinalizado = 0; 

    this.cantidadEspera = 0;
    this.cantidadActivo = 0;
    this.cantidadFinalizado = 0; 

    this.recargarEspera = false;
    this.recargarActivo = false;
    this.recargarFinalizado = false; 
    setTimeout(()=>{
      this.cargarLista();
      event.target.complete();
    }, 500);
  }
}
