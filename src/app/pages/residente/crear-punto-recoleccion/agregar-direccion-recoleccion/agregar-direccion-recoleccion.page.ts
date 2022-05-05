import { Component, OnInit } from '@angular/core';
import { Address } from '../../../../model/Address';
import { PuntoRecoleccionService } from 'src/app/services/punto-recoleccion.service';
import { UserService } from '../../../../services/user.service';
import { DataService } from '../../../../services/data.service';
import { ApiService } from '../../../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agregar-direccion-recoleccion',
  templateUrl: './agregar-direccion-recoleccion.page.html',
  styleUrls: ['./agregar-direccion-recoleccion.page.scss'],
})
export class AgregarDireccionRecoleccionPage implements OnInit {

  listaDireccion : Address[] = [];
  id : number = null;

  suscripcion : Subscription;

  constructor(
    private puntoRecoleccion : PuntoRecoleccionService,
    private userService : UserService,
    private apiService : ApiService
  ) {
    this.cargarDatos();
  }

  ngOnInit() {   
    this.suscripcion = this.userService.refresh$.subscribe(() =>{
      this.cargarDatos();
    }) 
  }

  cargarDatos(){
    this.userService.obtenerInfoResidente(this.apiService.emailUser).subscribe(data =>{
      this.id = data.data.id;
      this.listaDireccion = data.data.addressList;
    });
  }

  enviarDireccion(direccion : Address){
    this.puntoRecoleccion.setResidente(this.id);
    this.puntoRecoleccion.setDireccion(direccion);
  }

}
