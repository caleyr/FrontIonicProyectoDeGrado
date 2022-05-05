import { Component, OnInit } from '@angular/core';
import { Address } from '../../../model/Address';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/User';
import { PuntoRecoleccionService } from '../../../services/punto-recoleccion.service';

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.page.html',
  styleUrls: ['./agregar-direccion.page.scss'],
})
export class AgregarDireccionPage implements OnInit {

  listaDireccion: Address[];

  constructor(
    private usuarioService: UserService,
    private puntoRecoleccion : PuntoRecoleccionService) {
   }

  ngOnInit() {
    var user = sessionStorage.getItem("User");
    //Falta obtener token con datos
    this.usuarioService.obtenerDireccion(1).subscribe(Data=>{
        this.listaDireccion = Data.data;
    });
  }

  guardarDireccion(direccion : Address){
    this.puntoRecoleccion.setDireccion(direccion);
  }
}
