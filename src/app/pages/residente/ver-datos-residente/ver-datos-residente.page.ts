import { Component, OnInit } from '@angular/core';
import { Resident } from '../../../model/Resident';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/User';
import { Address } from '../../../model/Address';
import { ApiService } from '../../../services/api.service';
import { Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { OpcionesDireccionPage } from '../../popover/opciones-direccion/opciones-direccion.page';

@Component({
  selector: 'app-ver-datos-residente',
  templateUrl: './ver-datos-residente.page.html',
  styleUrls: ['./ver-datos-residente.page.scss'],
})
export class VerDatosResidentePage implements OnInit {

  residente : Resident = new Resident();
  usuario : User = new User();
  direccion : Address[] = [];

  editar : Boolean = false;
  input : Boolean = true;

  suscripcion : Subscription;

  constructor(
    private apiService : ApiService,
    private userService : UserService,
    public popoverController: PopoverController
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
      this.userService.usuarioResidente = data.data;
      this.residente = data.data;
      this.usuario = data.data.user;
      this.direccion = data.data.addressList;      
    });
  }

  actualizarDireccion(direccion : Address){
    this.userService.direccion = direccion;
  }

  async presentPopover(event, id : number) {
    const popover = await this.popoverController.create({
      component: OpcionesDireccionPage,
      event: event,
      mode: 'ios',
      componentProps:{       
        rol : 'residente',              
        id : id,
      }
    });
    await popover.present();
  }

}
