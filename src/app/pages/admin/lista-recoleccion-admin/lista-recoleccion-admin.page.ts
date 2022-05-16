import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { CollectionPoint } from '../../../model/CollectionPoint';
import { PuntoRecoleccionService } from '../../../services/punto-recoleccion.service';

@Component({
  selector: 'app-lista-recoleccion-admin',
  templateUrl: './lista-recoleccion-admin.page.html',
  styleUrls: ['./lista-recoleccion-admin.page.scss'],
})
export class ListaRecoleccionAdminPage implements OnInit {

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
  
 @ViewChild('slides', { static: true }) slider: IonSlides;   

  constructor(
    private puntoRecoleccion : PuntoRecoleccionService) { }

  ngOnInit() {    
    this.cargarLista();
  }

  async segmentoCambiado() {
    await this.slider.slideTo(this.segment);
  }

  async sliderCambiado() {
    this.segment = await this.slider.getActiveIndex();
  }

  cargarLista(){
    this.puntoRecoleccion.listaPaginada(0, 10, "Espera").subscribe(data => {
      this.listaPuntosEspera = data.data.records;
      this.cantidadEspera = data.data.numberOfRecords;
    });
    this.puntoRecoleccion.listaPaginada(0, 10, "Activo").subscribe(data => {
      this.listaPuntosActivo = data.data.records;
      this.cantidadActivo = data.data.numberOfRecords;
    });
    this.puntoRecoleccion.listaPaginada(0, 10, "Finalizado").subscribe(data => {
      this.listaPuntosFinalizado = data.data.records;
      this.cantidadFinalizado = data.data.numberOfRecords;
    });
  }

  listarPagina(contador, estado : string){
    this.puntoRecoleccion.listaPaginada(contador, 10, estado).subscribe(data => {
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
    }, 1500);
  }
}
