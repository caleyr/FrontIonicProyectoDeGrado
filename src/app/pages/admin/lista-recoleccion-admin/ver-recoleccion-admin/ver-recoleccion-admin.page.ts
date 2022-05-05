import { Component, OnInit } from '@angular/core';
import { Address } from '../../../../model/Address';
import { User } from '../../../../model/User';
import { CollectionPoint } from '../../../../model/CollectionPoint';
import { PuntoRecoleccionService } from '../../../../services/punto-recoleccion.service';
import { ActivatedRoute, Params } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../../../../services/user.service';
import { RutaService } from '../../../../services/ruta.service';

@Component({
  selector: 'app-ver-recoleccion-admin',
  templateUrl: './ver-recoleccion-admin.page.html',
  styleUrls: ['./ver-recoleccion-admin.page.scss'],
})
export class VerRecoleccionAdminPage implements OnInit {

  punto : CollectionPoint = new CollectionPoint();
  id: number = null;
  estado : any;
  idReciclador: number = null;

  user : User = new User();
  direccion : Address = new Address();

  constructor(
    private puntoRecoleccion : PuntoRecoleccionService,
    private route: ActivatedRoute,
    private userService: UserService,
    private rutaService : RutaService
    ) {       
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.estado = params['estado'];
      }); 
    }

  ngOnInit() {
    this.obtenerPunto();
  }

  async obtenerPunto(){
    await this.puntoRecoleccion.getCollectionPoint(this.id).subscribe(data=>{
      this.punto = data.data;
      this.direccion = data.data.address;
      this.idReciclador = data.data.routeId;
      if(this.estado !== 'Espera' || this.estado !== 'espera'){
        this.obtenerRuta();
      }
    });  
  }

  obtenerRuta(){
    this.rutaService.obtenerRuta(this.idReciclador).subscribe(data=>{
      this.obtenerUsuario(data.data.recycler);
    });
  }

  async obtenerUsuario(id : number){
    this.userService.obtenerReciclador(id).subscribe(data=>{
      this.user = data.data.user;
    });
  }
}
