import { Component, OnInit } from '@angular/core';
import { Shop } from '../../../model/Shop';
import { User } from '../../../model/User';
import { Address } from '../../../model/Address';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';
import { PopoverController } from '@ionic/angular';
import { OpcionesDireccionPage } from '../../popover/opciones-direccion/opciones-direccion.page';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Router } from '@angular/router';
import { LocalFile } from 'src/app/model/LocalFile';
import { Order } from 'src/app/model/Order';
import { OpcionesMaterialPage } from '../../popover/opciones-material/opciones-material.page';

@Component({
  selector: 'app-ver-datos-tienda',
  templateUrl: './ver-datos-tienda.page.html',
  styleUrls: ['./ver-datos-tienda.page.scss'],
})
export class VerDatosTiendaPage implements OnInit {

  tienda : Shop = new Shop();
  usuario : User = new User();
  direccion : Address = new Address();
  materiales : Order[] = [];

  img : LocalFile;
  formData : FormData;

  editar : Boolean = false;
  input : Boolean = true;

  suscripcion : Subscription;

  constructor(
    private apiService : ApiService,
    private userService : UserService,
    public popoverController: PopoverController
  ) {
    Camera.requestPermissions();
    this.cargarDatos();
  }

  ngOnInit() {
    this.suscripcion = this.userService.refresh$.subscribe(() =>{
      this.cargarDatos();
    })    
  }

  cargarDatos(){
    this.userService.obtenerInfoTienda(this.apiService.emailUser).subscribe(data =>{
      console.log(JSON.stringify(data.data));      
      this.userService.usuarioTienda = data.data;
      this.tienda = data.data;
      this.usuario = data.data.user;
      this.direccion = data.data.address; 
      this.materiales = data.data.orderList;
    });    
  }

  actualizarDireccion(direccion : Address){
    this.userService.direccion = direccion;
  }

  actualizarMaterial(material : Order){
    this.userService.material = material;
  }

  async presentPopoverDireccion(event) {
    const popover = await this.popoverController.create({
      component: OpcionesDireccionPage,
      event: event,
      mode: 'ios',
      componentProps:{       
        rol : 'tienda',              
        id : this.direccion.id,
      }
    });
    await popover.present();
  }

  async presentPopoverMaterial(event) {
    const popover = await this.popoverController.create({
      component: OpcionesMaterialPage,
      event: event,
      mode: 'ios',
      componentProps:{           
        id : this.tienda.id,
      }
    });
    await popover.present();
  }

  async addNewToGallery(){
    this.img = new LocalFile();
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,      
      allowEditing: false,
      quality: 60
    }).then(async (file) =>{    
      this.subirImg(file.base64String, file.format);
      
    },(err) => {
      console.log(err);
    });   
  }

  async subirImg(file : any, format : any){
    this.userService.agregarImage(this.tienda.id, format, {id: this.tienda.id, image : file} ).subscribe();
  }
}
