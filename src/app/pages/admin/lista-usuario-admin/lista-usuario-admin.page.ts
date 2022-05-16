import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/User';
import { ApiService } from '../../../services/api.service';
import { IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-usuario-admin',
  templateUrl: './lista-usuario-admin.page.html',
  styleUrls: ['./lista-usuario-admin.page.scss'],
})
export class ListaUsuarioAdminPage implements OnInit {

  lista: User[] = null;
  listaUsuarioResidente: User[] = null;
  listaUsuarioReciclador: User[] = null;
  listaUsuarioTienda: User[] = null;
  segment = 0;

  suscripcion : Subscription;

  @ViewChild('slides', { static: true }) slider: IonSlides;

  constructor(private usuarioService: UserService) { }

  ngOnInit() {
    this.suscripcion = this.usuarioService.refresh$.subscribe(() =>{
      this.lista = null;
      this.listaUsuarioResidente = null;
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
      this.listaUsuarioReciclador = this.lista.filter((data) => data.role === "Reciclador" && data.state === true);
      this.listaUsuarioResidente = this.lista.filter((data) => data.role === "isResident" );
      this.listaUsuarioTienda = this.lista.filter((data) => data.role === "isShop" && data.state === true);
    }
  }

  doRefresh(event){
    setTimeout(()=>{
      this.lista = null;
      this.listaUsuarioResidente = null;
      this.listaUsuarioReciclador = null;
      this.listaUsuarioTienda = null;
      this.listar();
      event.target.complete();
    }, 500);
  }
}
