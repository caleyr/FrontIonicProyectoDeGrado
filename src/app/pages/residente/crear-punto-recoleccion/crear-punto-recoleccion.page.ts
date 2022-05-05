import { Component, OnInit } from '@angular/core';
import { PuntoRecoleccionService } from '../../../services/punto-recoleccion.service';

@Component({
  selector: 'app-crear-punto-recoleccion',
  templateUrl: './crear-punto-recoleccion.page.html',
  styleUrls: ['./crear-punto-recoleccion.page.scss'],
})
export class CrearPuntoRecoleccionPage implements OnInit {

  constructor(private puntoRecoleccion : PuntoRecoleccionService) { }

  ngOnInit() {
  }

  setClasificacion(clasificacion : string){
    this.puntoRecoleccion.setClasificacion(clasificacion);
  }

}
