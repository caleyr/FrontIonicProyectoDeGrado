import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../../services/ruta.service';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { Route } from '../../../model/Route';

@Component({
  selector: 'app-historial-rutas',
  templateUrl: './historial-rutas.page.html',
  styleUrls: ['./historial-rutas.page.scss'],
})
export class HistorialRutasPage implements OnInit {

  listaRuta : Route[] = [];

  constructor(
    private rutaService : RutaService,
    private userService : UserService,
    private apiService : ApiService
    ) {      
  }

  ngOnInit() {
    this.listar();
  }

  async listar() {
    const data = await this.userService.obtenerInfoReciclador(this.apiService.emailUser).toPromise();
    if(data.status === 200){
      this.rutaService.obtenerRutaActiva(data.data.id).subscribe(data => {
        if(data.status === 200){
          this.listaRuta = data.data;
          this.listaRuta = this.listaRuta.filter((data) => data.endDate.toDateString() !== '0001-01-01T00:00:00');
        }
      });
    }    
  }

  doRefresh(event){
    setTimeout(()=>{      
      this.listaRuta = [];
      this.listar();
      event.target.complete();
    }, 500);
  }

}
