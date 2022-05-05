import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { Resident } from '../../../model/Resident';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-cuenta-residente',
  templateUrl: './ver-cuenta-residente.page.html',
  styleUrls: ['./ver-cuenta-residente.page.scss'],
})
export class VerCuentaResidentePage implements OnInit {

  residente : Resident = new Resident();
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
    this.userService.obtenerInfoResidente(this.apiService.emailUser).subscribe(data =>{
      this.residente = data.data;
    });
  }

}
