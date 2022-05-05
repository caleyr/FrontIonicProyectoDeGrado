import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/User';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-lista-usuario-admin',
  templateUrl: './lista-usuario-admin.page.html',
  styleUrls: ['./lista-usuario-admin.page.scss'],
})
export class ListaUsuarioAdminPage implements OnInit {

  listaUsuario: User[] = [];

  constructor(private usuarioService: UserService) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.usuarioService.obtenerListaUsuario().subscribe(data => {
      console.log(data.data);      
      this.listaUsuario = data.data;
    });
  }

  doRefresh(event){
    setTimeout(()=>{
      this.listar();
      event.target.complete();
    }, 1500);
  }
}
