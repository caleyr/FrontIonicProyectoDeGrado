import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Historial } from 'src/app/model/Historial';
import { Order } from '../../../model/Order';
import { UserService } from '../../../services/user.service';
import { element } from 'protractor';

@Component({
  selector: 'app-calcular-material',
  templateUrl: './calcular-material.page.html',
  styleUrls: ['./calcular-material.page.scss'],
})
export class CalcularMaterialPage implements OnInit {

  listaMateriales : Order[] = [];

  historial : Historial[] = [];

  total : number = 0;

  material : Order = new Order();
  cantidad : number = null;
  segment = 0;

  @ViewChild('slides', { static: true }) slider: IonSlides;
  

  constructor(
    private userService : UserService
  ) {
    this.historial = this.userService.historial;
    this.totalCalcular();
    this.listaMateriales = this.userService.listaMaterial;
  }

  ngOnInit() {    
  }

  async segmentoCambiado() {
    await this.slider.slideTo(this.segment);
  }

  async sliderCambiado() {
    this.segment = await this.slider.getActiveIndex();
  }

  totalCalcular(){
    if(Object.keys(this.historial).length !== 0){
      this.historial.forEach(element => {
        this.total += element.material.price * element.cantidad;
      });
    }
  }

  agregarHistorial(){
    if(this.cantidad !== 0 && this.cantidad !== null){
      this.total += this.material.price * this.cantidad;
      this.historial.push({material : this.material, cantidad : this.cantidad});
      this.userService.historial = this.historial;
      this.segment = 1;
      this.segmentoCambiado();
    }else{
      this.cantidad = 0;
    }
  }

  eliminarDatos(){
    this.total = 0;
    this.historial = [];
    this.userService.historial = this.historial;
  }
}
