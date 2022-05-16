import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../model/User';
import { UserService } from '../../../services/user.service';
import { IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios-pendientes',
  templateUrl: './usuarios-pendientes.page.html',
  styleUrls: ['./usuarios-pendientes.page.scss'],
})
export class UsuariosPendientesPage implements OnInit {

  lista: User[] = null;
  listaUsuarioReciclador: User[] = null;
  listaUsuarioTienda: User[] = null;
  segment = 0;

  suscripcion : Subscription;

  @ViewChild('slides', { static: true }) slider: IonSlides;

  constructor(private usuarioService: UserService) { }

  ngOnInit() {
    this.suscripcion = this.usuarioService.refresh$.subscribe(() =>{
      this.lista = null;
      this.listaUsuarioReciclador = null;
      this.listaUsuarioTienda = null;
      this.listar();
    })
    this.listar();  
  }

  async segmentoCambiado() {
    await this.slider.slideTo(this.segment);
  }

  async sliderCambiado() {
    this.segment = await this.slider.getActiveIndex();
  }

  async listar() {
    const data = await this.usuarioService.obtenerListaUsuario().toPromise();
    if(data.status === 200){      
      this.lista = data.data;
      this.listaUsuarioReciclador = this.lista.filter((data) => data.role === "Reciclador" && data.state === false);
      this.listaUsuarioTienda = this.lista.filter((data) => data.role === "isShop" && data.state === false);
    }
  }

  doRefresh(event){
    setTimeout(()=>{
      this.lista = null;
      this.listaUsuarioReciclador = null;
      this.listaUsuarioTienda = null;
      this.listar();
      event.target.complete();
    }, 500);
  }

}
