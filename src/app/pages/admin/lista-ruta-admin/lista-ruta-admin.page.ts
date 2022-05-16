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
  
  listaRuta : Route[] = null;
  cantidad = 0;
  contador = 0;
  recargarPagina = false;

  constructor(
    private rutaService : RutaService,
    private userService : UserService
    ) {      
  }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.rutaService.obtenerListaRuta(0,10).subscribe(data => {
      this.listaRuta = data.data.records;
      this.cantidad = data.data.numberOfRecords;
      this.cargarUsuario();
    });
  }

  listarPagina() {
    this.rutaService.obtenerListaRuta(this.contador,10).subscribe(data => {
      this.listaRuta = this.listaRuta.concat(data.data.records);
      this.cargarUsuario();
    });
  }

  cargarUsuario(){
    for (let index = 0; index < this.listaRuta.length; index++) {
      this.userService.obtenerReciclador(this.listaRuta[index].recycler).subscribe(data=>{
        if(data.status === 200){
          this.listaRuta[index].user = data.data.user;
        }
      });
    }
  }

  cargarPage(event){    
    setTimeout(() => {
      this.contador++;
      if(this.listaRuta.length === this.cantidad){     
        event.target.complete();     
        this.recargarPagina = true;
      }else{
        this.listarPagina();
        event.target.complete();
      }
    }, 500);
  }

  doRefresh(event){
    setTimeout(()=>{
      this.listaRuta  = null;
      this.recargarPagina = false;
      this.cantidad = 0;
      this.contador = 0;
      this.listar();
      event.target.complete();
    }, 500);
  }
}
