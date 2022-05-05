import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/model/Route';
import { RutaService } from '../../../services/ruta.service';
import { User } from '../../../model/User';
import { Recycler } from '../../../model/Recycler';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lista-ruta-admin',
  templateUrl: './lista-ruta-admin.page.html',
  styleUrls: ['./lista-ruta-admin.page.scss'],
})
export class ListaRutaAdminPage implements OnInit {
  
  listUser : User[] = [];
  listaRuta : Route[] = [];

  constructor(
    private rutaService : RutaService,
    private userService : UserService
    ) {      
      this.listar();
  }

  ngOnInit() {
  }

  listar() {
    this.rutaService.obtenerListaRuta(0,10).subscribe(data => {
      this.listaRuta = data.data.records;
      this.cargarUsuario();
    });
  }

  cargarUsuario(){
    this.listaRuta.forEach(element => {
      this.userService.obtenerReciclador(element.recycler).subscribe(data=>{
        element.listaRecycler = data.data.user;
      });
    });    
  }

  doRefresh(event){
    setTimeout(()=>{
      this.listar();
      event.target.complete();
    }, 1500);
  }
}
