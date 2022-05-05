import { Component, OnInit } from '@angular/core';
import { Recycler } from '../../../model/Recycler';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-cuenta-reciclador',
  templateUrl: './ver-cuenta-reciclador.page.html',
  styleUrls: ['./ver-cuenta-reciclador.page.scss'],
})
export class VerCuentaRecicladorPage implements OnInit {

  reciclador : Recycler = new Recycler();
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
    this.userService.obtenerInfoReciclador(this.apiService.emailUser).subscribe(data =>{
      this.reciclador = data.data;
    });
  }
}
