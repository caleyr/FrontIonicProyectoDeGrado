import { Component, OnInit } from '@angular/core';
import { PuntoRecoleccionService } from '../../../services/punto-recoleccion.service';
import { CollectionPoint } from '../../../model/CollectionPoint';

@Component({
  selector: 'app-agregar-clasificacion',
  templateUrl: './agregar-clasificacion.page.html',
  styleUrls: ['./agregar-clasificacion.page.scss'],
})
export class AgregarClasificacionPage implements OnInit {

  constructor(private puntoRecoleccion : PuntoRecoleccionService) {
  }

  ngOnInit() { 
  }

  setClasificacion(clasificacion : string){
    this.puntoRecoleccion.setClasificacion(clasificacion);
  }
}
