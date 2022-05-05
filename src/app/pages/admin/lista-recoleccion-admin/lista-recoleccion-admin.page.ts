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

  listaPuntosEspera: CollectionPoint[] = [];
  listaPuntosActivo: CollectionPoint[] = [];
  listaPuntosFinalizado: CollectionPoint[] = [];
  segment = 0;  
  contador = 0; 
  
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

  cargarLista(event?){
    this.puntoRecoleccion.listaPaginada(this.contador, 10, "Espera").subscribe(data => {
      this.listaPuntosEspera = data.data.records;
    });
    this.puntoRecoleccion.listaPaginada(this.contador, 10, "Activo").subscribe(data => {
      this.listaPuntosActivo = data.data.records;
    });
    this.puntoRecoleccion.listaPaginada(this.contador, 10, "Finalizado").subscribe(data => {
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

  doRefresh(event){
    setTimeout(()=>{
      this.cargarLista();
      event.target.complete();
    }, 1500);
  }
}
