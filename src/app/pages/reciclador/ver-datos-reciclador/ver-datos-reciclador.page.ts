import { Component, OnInit } from '@angular/core';
import { Recycler } from '../../../model/Recycler';
import { User } from '../../../model/User';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-datos-reciclador',
  templateUrl: './ver-datos-reciclador.page.html',
  styleUrls: ['./ver-datos-reciclador.page.scss'],
})
export class VerDatosRecicladorPage implements OnInit {

  reciclador : Recycler = new Recycler();
  usuario : User = new User();

  suscripcion : Subscription;

  constructor(
    private apiService : ApiService,
    private userService : UserService
  ) { 
    this.cargarDatos();
  }

  ngOnInit() {
    this.suscripcion = this.userService.refresh$.subscribe(() =>{
      console.log('entro');
      
      this.cargarDatos();
    })
  }

  cargarDatos(){
    this.userService.obtenerInfoReciclador(this.apiService.emailUser).subscribe(data =>{      
      this.userService.usuarioReciclador = data.data;
      this.reciclador = data.data;
      this.usuario = data.data.user;      
    });
  }
}
