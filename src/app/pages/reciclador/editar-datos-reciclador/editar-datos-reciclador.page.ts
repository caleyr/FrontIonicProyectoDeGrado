import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recycler } from '../../../model/Recycler';

@Component({
  selector: 'app-editar-datos-reciclador',
  templateUrl: './editar-datos-reciclador.page.html',
  styleUrls: ['./editar-datos-reciclador.page.scss'],
})
export class EditarDatosRecicladorPage implements OnInit {

  form : FormGroup;
  id : number;
  reciclador : Recycler;

  constructor(
    private formBuilder : FormBuilder,
    private alertController : AlertController,
    private router : Router ,
    private userService : UserService,
    private route: ActivatedRoute
  ) {
    this.reciclador = this.userService.usuarioReciclador;
    this.inicializarFormulario();
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
  }

  inicializarFormulario() {
    this.form = this.formBuilder.group({
      nombre: [this.reciclador.name, [Validators.required]],
      apellido: [this.reciclador.lastName, [Validators.required]],
      telefono: [this.reciclador.phone, [Validators.required, Validators.pattern('[0-9]*')]],
      numeroDocumento: [this.reciclador.document, [Validators.required, Validators.pattern('[0-9]*')]],
    });    
  }

  async actualizarDatos() {
    console.log(this.form.valid);
    console.log(this.form.value);
    if(this.form.valid == true){
      let reciclador = new Recycler();
        reciclador.name = this.getNombre().value;
        reciclador.lastName = this.getApellido().value;
        reciclador.phone = this.getTelefono().value;
        reciclador.documentType = 'CC';
        reciclador.document = this.getNumeroDocumento().value;
        this.userService.updateResycler(reciclador, this.id).subscribe(
          async _ => {       
            console.log("Usuario Actualizado");  
            this.presentAlert();
          },
          async (res) => {
            console.log("Usuario No Actualizado");            
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
            this.router.navigateByUrl('/reciclador/ver-datos-reciclador', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  getNombre(){
    return this.form.get('nombre');
  }

  getApellido(){
    return this.form.get('apellido');
  }

  getNumeroDocumento(){
    return this.form.get('numeroDocumento');
  }

  getTelefono(){
    return this.form.get('telefono');
  }

}
