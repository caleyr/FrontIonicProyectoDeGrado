import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.page.html',
  styleUrls: ['./verificar-email.page.scss'],
})
export class VerificarEmailPage implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private navController : Router,
    private alertController : AlertController,
    private loadingController : LoadingController
  ) {
    this.inicializarFormularioVacio();

   }

  ngOnInit() {
  }

  inicializarFormularioVacio() {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
    });    
  }

  async recuperarPassword(){
    const loading = await this.loadingController.create();
    if(this.form.valid === true){      
      await loading.present();
      const verificar = await this.userService.verificarCorreoExistente(this.getCorreo().value).toPromise();
      if(verificar.status === 200){
        const data = await this.userService.recuperarPasswordEmail(this.getCorreo().value).toPromise();
        if(data.status === 204){   
          await loading.dismiss()
          this.navController.navigateByUrl(`/usuarios/codigo-verificacion/recuperar/${this.getCorreo().value}`, { replaceUrl: true })
        }else{
          await loading.dismiss()
          this.presentAlertError();
        }
      }else{
        await loading.dismiss()
        this.presentAlertError();
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

  getCorreo(){
    return this.form.get('correo');
  }

  async presentAlertError(){
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Correo no encontrado.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
