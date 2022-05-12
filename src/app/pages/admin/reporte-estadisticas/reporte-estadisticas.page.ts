import { Component, OnInit } from '@angular/core';
import { PuntoRecoleccionService } from '../../../services/punto-recoleccion.service';
import { CollectionPoint } from '../../../model/CollectionPoint';
import { RutaService } from '../../../services/ruta.service';
import { Route } from '../../../model/Route';

@Component({
  selector: 'app-reporte-estadisticas',
  templateUrl: './reporte-estadisticas.page.html',
  styleUrls: ['./reporte-estadisticas.page.scss'],
})
export class ReporteEstadisticasPage implements OnInit {

  tiempo : string = "MES";
  puntos : CollectionPoint[] = [];
  ruta : Route[] = [];
  listaRangoPuntos = null;
  listaRangoRuta = null;
  listaResultadosPunto = 
  [
    {
      material : 'Plastico',
      cantidad : 0,
      porcentaje : 0
    },
    {
      material : 'CartonYPapel',
      cantidad : 0,
      porcentaje : 0
    },
    {
      material : 'VidrioOMetal',
      cantidad : 0,
      porcentaje : 0
    },
    {
      material : 'Todos',
      cantidad : 0,
      porcentaje : 0
    },
  ]

  listaResultadosRuta = 
  [
    {
      material : 'Plastico',
      cantidad : 0,
      porcentaje : 0
    },
    {
      material : 'CartonYPapel',
      cantidad : 0,
      porcentaje : 0
    },
    {
      material : 'VidrioOMetal',
      cantidad : 0,
      porcentaje : 0
    },
    {
      material : 'Todos',
      cantidad : 0,
      porcentaje : 0
    },
  ]
  constructor(
    private puntoRecoleccionService : PuntoRecoleccionService,
    private rutaService : RutaService
  ) { }

  async ngOnInit() {
    const dataP = await this.puntoRecoleccionService.listaDate(this.tiempo).toPromise();
    if(dataP.status === 200){
      this.calcularPunto(dataP.data);
    }
    const dataR = await this.rutaService.obtenerListaTiempo(this.tiempo).toPromise();
    if(dataR.status === 200){
      this.calcularRuta(dataR.data);
    }
  }

  calcularPunto(data){
    this.puntos = data;
    const arreglo = Array.from({length: (this.puntos.length - 0) / (this.puntos.length/5)}, (f, g) => g * (this.puntos.length/5) );
    this.listaRangoPuntos = arreglo.sort(function (a, b){ return b - a; });
    for (let index = 0; index < this.listaRangoPuntos.length; index++) {
      if(this.listaRangoPuntos[index] - Math.floor(this.listaRangoPuntos[index]) != 0){        
        var element = this.listaRangoPuntos[index].toFixed(1);
        this.listaRangoPuntos[index] = element;
      }
    }

    for (let index = 0; index < this.puntos.length; index++) {
      if(this.puntos[index].typeOfMaterial === 'Plastico'){
        this.listaResultadosPunto[0].cantidad++;
      }else if(this.puntos[index].typeOfMaterial === 'CartonYPapel'){
        this.listaResultadosPunto[1].cantidad++;
      }else if(this.puntos[index].typeOfMaterial === 'VidrioOMetal'){
        this.listaResultadosPunto[2].cantidad++;
      }else if(this.puntos[index].typeOfMaterial === 'Todos'){
        this.listaResultadosPunto[3].cantidad++;
      }
    }

    for (let index = 0; index < this.listaResultadosPunto.length; index++) {      
      this.listaResultadosPunto[index].porcentaje = (this.listaResultadosPunto[index].cantidad*100)/this.puntos.length;      
    }
  }

  calcularRuta(data){    
    this.ruta = data;
    const arreglo = Array.from({length: (this.ruta.length - 0) / (this.ruta.length/5)}, (f, g) => g * (this.ruta.length/5) );
    this.listaRangoRuta = arreglo.sort(function (a, b){ return b - a; });
    for (let index = 0; index < this.listaRangoRuta.length; index++) {
      if(this.listaRangoRuta[index] - Math.floor(this.listaRangoRuta[index]) != 0){        
        var element = this.listaRangoRuta[index].toFixed(1);
        this.listaRangoRuta[index] = element;
      }
    }   
    
    var plas = 0;
    var carP = 0;
    var voM = 0;
    
    for (let i = 0; i < this.ruta.length; i++) {
      plas = 0;
      carP = 0;
      voM = 0;
      for (var f = 0; f < this.ruta[i].collectionPoints.length; f++) {
        if(this.ruta[i].collectionPoints[f].typeOfMaterial === 'Plastico'){
          plas++;
        }else if(this.ruta[i].collectionPoints[f].typeOfMaterial === 'CartonYPapel'){
          carP++;
        }else if(this.ruta[i].collectionPoints[f].typeOfMaterial === 'VidrioOMetal'){
          voM++;
        }
      }
      if(this.ruta[i].collectionPoints.length === plas){
        this.listaResultadosRuta[0].cantidad++;
      }else if(this.ruta[i].collectionPoints.length === carP){
        this.listaResultadosRuta[1].cantidad++;
      }else if(this.ruta[i].collectionPoints.length === voM){
        this.listaResultadosRuta[2].cantidad++;
      }else{
        this.listaResultadosRuta[3].cantidad++;
      }
    }

    for (let index = 0; index < this.listaResultadosRuta.length; index++) {      
      this.listaResultadosRuta[index].porcentaje = (this.listaResultadosRuta[index].cantidad*100)/this.ruta.length;      
    }
  }

  async cambiarGrafica(tiempo){
    const dataP = await this.puntoRecoleccionService.listaDate(tiempo).toPromise();
    if(dataP.status === 200){
      for (let index = 0; index < this.listaResultadosPunto.length; index++) {
        this.listaResultadosPunto[index].cantidad = 0;
        this.listaResultadosPunto[index].porcentaje = 0;        
      }
      this.calcularPunto(dataP.data);
    }
    const dataR = await this.rutaService.obtenerListaTiempo(tiempo).toPromise();
    if(dataR.status === 200){
      for (let index = 0; index < this.listaResultadosRuta.length; index++) {
        this.listaResultadosRuta[index].cantidad = 0;
        this.listaResultadosRuta[index].porcentaje = 0;  
      }
      this.calcularRuta(dataR.data);
    }
  }

  
}
