import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cuidados',
  templateUrl: './cuidados.page.html',
  styleUrls: ['./cuidados.page.scss'],
})
export class CuidadosPage implements OnInit {

  slides = [
    {
      img: 'assets/images/cuidados/img1.png',
      descripcion: 'Separa en un bote la basura orgánica y Coloca en otro cesto la basura inorgánica.'

    },
    {
      img: 'assets/images/cuidados/img2.png',
      descripcion: 'Los residuos inorgánicos, sepáralos de manera independiente: Ejemplos: bolsas, empaques y envases de plástico, vidrio, papel, cartón y metales.'
    },
    {
      img: 'assets/images/cuidados/img3.png',
      descripcion: 'El Reciclaje es Responsabilidad de toda la Humanidad Reciclar es Reintegrar la Basura al Medio Ambiente.'
    }
  ]

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
  }

}
