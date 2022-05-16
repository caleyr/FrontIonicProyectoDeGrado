import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/model/Shop';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-cuenta-tienda',
  templateUrl: './ver-cuenta-tienda.page.html',
  styleUrls: ['./ver-cuenta-tienda.page.scss'],
})
export class VerCuentaTiendaPage implements OnInit {

  tienda : Shop = null;
  suscripcion : Subscription;

  constructor(    
    private userService : UserService,
    public apiService : ApiService
  ) { 
    this.cargarDatos();
  }

  ngOnInit() {
    this.suscripcion = this.userService.refresh$.subscribe(() =>{
      this.cargarDatos();
    })
  }

  cargarDatos(){
    this.userService.obtenerInfoTienda(this.apiService.emailUser).subscribe(data =>{
      this.tienda = data.data;
    });
  }
}
