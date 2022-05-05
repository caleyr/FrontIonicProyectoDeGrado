import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../model/User';
import { Resident } from '../../../model/Resident';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../../services/user.service';
import { VerDatosResidentePage } from '../ver-datos-residente/ver-datos-residente.page';

@Component({
  selector: 'app-editar-datos-residente',
  templateUrl: './editar-datos-residente.page.html',
  styleUrls: ['./editar-datos-residente.page.scss'],
})
export class EditarDatosResidentePage implements OnInit {

  form : FormGroup;
  id : number;
  residente : Resident;

  constructor(
    private formBuilder : FormBuilder,
    private alertController : AlertController,
    private router : Router ,
    private userService : UserService,
    private route: ActivatedRoute
    ) {
      this.residente = this.userService.usuarioResidente;
      this.inicializarFormulario();
     }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
  }

  inicializarFormulario() {
    this.form = this.formBuilder.group({
      nombre: [this.residente.name, [Validators.required]],
      apellido: [this.residente.lastName, [Validators.required]],
      telefono: [this.residente.phone, [Validators.required, Validators.pattern('[0-9]*')]]
    });    
  }

  async actualizarDatos() {
    console.log(this.form.valid);
    console.log(this.form.value);
    if(this.form.valid == true){
      let residente = new Resident();
        residente.name = this.getNombre().value;
        residente.lastName = this.getApellido().value;
        residente.phone = this.getTelefono().value;
        this.userService.updateResident(residente, this.id).subscribe(
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
            this.router.navigateByUrl('/residente/ver-datos-residente', { replaceUrl: true });
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

  getTelefono(){
    return this.form.get('telefono');
  }

}
