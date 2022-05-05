import { Component, OnInit } from '@angular/core';
import { Resident } from '../../../../model/Resident';
import { Recycler } from '../../../../model/Recycler';
import { Shop } from '../../../../model/Shop';
import { User } from '../../../../model/User';
import { Address } from '../../../../model/Address';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Order } from '../../../../model/Order';

@Component({
  selector: 'app-ver-usuario-admin',
  templateUrl: './ver-usuario-admin.page.html',
  styleUrls: ['./ver-usuario-admin.page.scss'],
})
export class VerUsuarioAdminPage implements OnInit {

  residente: Resident = new Resident;
  reciclador: Recycler = new Recycler;
  tienda: Shop = new Shop;

  user: User = new User;  
  estado : boolean;
  listaDireccion: Address[] = [];
  listaMateriales: Order[] = [];

  private id : number = 0;
  private email: string;
  private rol: string;

  constructor(
    private usuarioService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    private alertController: AlertController) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.email = params['email'];
      this.rol = params['id_role'];
      this.id = params['id'];
    });    
    this.usuarioService.obtenerUsuario(this.id).subscribe(result =>{
      this.user = result.data;
      this.estado = result.data.state;      
      this.obtenerDatos();
    });
  }

  obtenerDatos(){
    if(this.rol == "Reciclador"){
      this.usuarioService.obtenerInfoReciclador(this.email).subscribe(results =>{
        this.reciclador = results.data;        
      });
    }else if(this.rol == "isResident"){
      this.usuarioService.obtenerInfoResidente(this.email).subscribe(results =>{
        this.residente = results.data;
        this.listaDireccion = results.data.addressList;
      });
    }else if(this.rol == "isShop"){
      this.usuarioService.obtenerInfoTienda(this.email).subscribe(results =>{
        this.tienda = results.data;
        this.listaDireccion[0] = results.data.address;
        this.listaMateriales = results.data.orderList;
        console.log(results);
      });
    }
  }

  cambiarEstado(){
    if(this.user.state!= this.estado){
      this.presentAlert();      
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      message: 'Desea cambiar el estado.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.usuarioService.cambiarEstado(this.user).subscribe(
              result => {
                console.log(result);                
                this.presentToast();            
                this.router.navigateByUrl('/admin/lista-usuario-admin', { replaceUrl: true });
              },
              error => {
                console.log(error);                  
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'El estado se a cambiado.',
      duration: 2000
    });
    toast.present();
  }
}
