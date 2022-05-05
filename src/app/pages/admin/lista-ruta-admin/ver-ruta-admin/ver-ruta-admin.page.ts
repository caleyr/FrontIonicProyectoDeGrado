import { Component, OnInit } from '@angular/core';
import { Route } from '../../../../model/Route';
import { ActivatedRoute, Params } from '@angular/router';
import { RutaService } from '../../../../services/ruta.service';
import { CollectionPoint } from '../../../../model/CollectionPoint';
import { UserService } from '../../../../services/user.service';
import { Recycler } from '../../../../model/Recycler';

@Component({
  selector: 'app-ver-ruta-admin',
  templateUrl: './ver-ruta-admin.page.html',
  styleUrls: ['./ver-ruta-admin.page.scss'],
})
export class VerRutaAdminPage implements OnInit {

  ruta : Route = new Route();
  punto : CollectionPoint[] = [];
  reciclador : Recycler = new Recycler();
  idReciclador :  number;
  id: number = null;

  constructor(
    private rutaService: RutaService,
    private route: ActivatedRoute,
    private userService : UserService
  ) { 
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    }); 
  }

  ngOnInit() {
    this.obtenerRuta();
  }

  async obtenerRuta(){
    await this.rutaService.obtenerRuta(this.id).subscribe(data=>{
      this.ruta = data.data;      
      this.punto = data.data.collectionPoints;
      this.idReciclador = data.data.recycler;
      this.obtenerReciclador();
    });      
    console.log(this.punto);
  }

  async obtenerReciclador(){  
    this.userService.obtenerReciclador(this.idReciclador).subscribe(data=>{
      this.reciclador = data.data;
    });
  }
}
