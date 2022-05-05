import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PuntoRecoleccionService } from '../../../services/punto-recoleccion.service';

@Component({
  selector: 'app-agregar-descripcion',
  templateUrl: './agregar-descripcion.page.html',
  styleUrls: ['./agregar-descripcion.page.scss'],
})
export class AgregarDescripcionPage implements OnInit {

descripcion : string = ' ';

  constructor(private puntoRecoleccion : PuntoRecoleccionService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.puntoRecoleccion.setDescripcion(this.descripcion);
    //this.puntoRecoleccion.agregarCollectionPoint();
  }

}
