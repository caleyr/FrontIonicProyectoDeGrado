import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-finalizar-recoleccion',
  templateUrl: './finalizar-recoleccion.page.html',
  styleUrls: ['./finalizar-recoleccion.page.scss'],
})
export class FinalizarRecoleccionPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  home() {
    this.navCtrl.navigateForward('/tabs-reciclador/ver-recoleccion', { animated: false });
  }
}
