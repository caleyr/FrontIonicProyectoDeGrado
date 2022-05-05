import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/User';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
})
export class CambiarPasswordPage implements OnInit {

  form: FormGroup;
  loading = null; 

  codigo : any;
  email : any;
  user : User = {
    id : null,
    email : null,
    password : null,
    role : "String",
    state : true
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder : FormBuilder,
    private userService : UserService,
    private navController : Router,
    private alertController : AlertController,
    private loadingController : LoadingController
  ) { 
    this.inicializarFormularioVacio();
  }

  async ngOnInit() {
    this.route.params.subscribe((params: Params) => {      
      this.codigo = params['codigo'];   
      this.email = params['email'];
    });
    this.loading = await this.loadingController.create();
  }


  inicializarFormularioVacio() {
    this.form = this.formBuilder.group({
      contrasenia: ['', [Validators.required]],
      confContrasenia: ['', [Validators.required]],
    });    
  }

  async recuperarPassword(){
    if(this.form.valid === true){
      await this.loading.present();
      if( this.getContrasenia().value === this.getConfContrasenia().value ){
        this.user.email = this.email;
        this.user.password = this.getContrasenia().value;
        this.userService.actualizarContraseña(this.codigo, this.user).subscribe(
          async data=>{
            if(data.status === 204){              
              await this.loading.dismiss();
              this.presentAlert('Contraseña Actualizada.');
            }else{
              await this.loading.dismiss();           
              this.presentAlertErrorNormal('El código no es correcto.');
            }          
          },
          async (error)=>{
            await this.loading.dismiss();
            this.presentAlertErrorNormal('Error Server.');
          }
        )
      }else{
        await this.loading.dismiss();
        this.presentAlertError('Las contraseñas no coinciden.');
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

  getContrasenia(){
    return this.form.get('contrasenia');
  }

  getConfContrasenia(){
    return this.form.get('confContrasenia');
  }

  async presentAlert(msj : string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: msj,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            this.navController.navigateByUrl('/login', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertError(msj : string){
    const alert = await this.alertController.create({
      mode: 'ios',
      header: msj,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  async presentAlertErrorNormal(msj : string){
    const alert = await this.alertController.create({
      mode: 'ios',
      header: msj,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) =>{
            this.navController.navigateByUrl(`/usuarios/verificar-email`, { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }
}
