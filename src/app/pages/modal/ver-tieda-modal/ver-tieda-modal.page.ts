import { Component, OnInit, Input } from '@angular/core';
import { Shop } from '../../../model/Shop';
import { ModalController } from '@ionic/angular';
import { Order } from '../../../model/Order';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-ver-tieda-modal',
  templateUrl: './ver-tieda-modal.page.html',
  styleUrls: ['./ver-tieda-modal.page.scss'],
})
export class VerTiedaModalPage implements OnInit {

  @Input('tienda')tienda: Shop;
  materiales : Order[];
  constructor(
    private modalController : ModalController,
    private userService : UserService
    ) {      
  }

  ngOnInit() {
    this.materiales = this.tienda.orderList;
  }

  async cerrarModal(){
    await this.modalController.dismiss();
  }

  enviarMaterial(){
    this.userService.listaMaterial = this.materiales;
    this.cerrarModal();
  }
}
