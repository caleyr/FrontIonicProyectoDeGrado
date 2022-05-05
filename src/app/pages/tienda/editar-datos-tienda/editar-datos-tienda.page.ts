import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AlertController } from '@ionic/angular';
import { Shop } from 'src/app/model/Shop';

@Component({
  selector: 'app-editar-datos-tienda',
  templateUrl: './editar-datos-tienda.page.html',
  styleUrls: ['./editar-datos-tienda.page.scss'],
})
export class EditarDatosTiendaPage implements OnInit {

  form : FormGroup;
  id : number;
  tienda : Shop;

  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private userService : UserService,
    private alertController: AlertController,
    private router: Router,
  ) { 
    this.tienda = this.userService.usuarioTienda;
    this.inicializarFormulario();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
  }

  inicializarFormulario() {
    this.form = this.formBuilder.group({
      nombre: [this.tienda.name , [Validators.required]],
      tipoDocumento: [this.tienda.documentType , [Validators.required]],
      numeroDocumento: [ this.tienda.document , [Validators.required, Validators.pattern('[0-9]*')]],
      telefono: [ this.tienda.phone , [Validators.required, Validators.pattern('[0-9]*')]]
    }); 
  }

  async actualizarDatos() {
    if(this.form.valid == true){

      let tienda = new Shop();
        tienda.name = this.getNombre().value;
        tienda.documentType = this.getTipoDocumento().value;
        tienda.document = this.getNumeroDocumento().value;
        tienda.phone = this.getTelefono().value;

        this.userService.updateShop(tienda, this.id).subscribe(
          async _ => {       
            console.log("Usuario Registrador");  
            this.presentAlert();
          },
          async (res) => {
            console.log("Usuario Registrador");            
            this.presentAlertError();            
          }
        );
    }else{
      this.form.markAllAsTouched();
    }
  }

  async presentAlertError(){
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Datos incorrectos.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Datos Actualizados',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            this.router.navigateByUrl('/tabs-tienda/ver-datos-tienda', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  getNombre(){
    return this.form.get('nombre');
  }

  getTipoDocumento(){
    return this.form.get('tipoDocumento');
  }

  getNumeroDocumento(){
    return this.form.get('numeroDocumento');
  }  

  getTelefono(){
    return this.form.get('telefono');
  }
}
