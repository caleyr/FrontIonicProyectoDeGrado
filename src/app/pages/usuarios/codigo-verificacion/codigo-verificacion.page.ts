import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-codigo-verificacion',
  templateUrl: './codigo-verificacion.page.html',
  styleUrls: ['./codigo-verificacion.page.scss'],
})
export class CodigoVerificacionPage implements OnInit {

  form: FormGroup;
  loading = null;

  accion = null
  email = null;

  constructor(
    private route: ActivatedRoute,
    private userService : UserService,
    private alertController : AlertController,
    private router: Router,
    private formBuilder : FormBuilder,
    private loadingController : LoadingController
  ){
    this.inicializarFormularioVacio();
  }

  async ngOnInit() {
    this.route.params.subscribe((params: Params) => {      
      this.accion = params['accion'];
      this.email = params['email'];
    }); 
    this.loading = await this.loadingController.create();
  }

  inicializarFormularioVacio() {
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]]
    });
  }

  async enviarCodigo(){    
    if(this.form.valid){
      await this.loading.present();
      if(this.accion === 'registro'){
        const data = await this.userService.verificarCorreo(this.email, this.getCodigo().value).toPromise();
        if(data.status === 204){
          await this.loading.dismiss();
          this.presentAlert('Usuario Registrado');
        }else{
          await this.loading.dismiss();
          this.presentAlertError();
        }
      }else{
        await this.loading.dismiss();
        this.router.navigateByUrl(`/usuarios/cambiar-password/${this.email}/${this.getCodigo().value}`, { replaceUrl: true });
      }
    }else{
      this.presentAlertError();
    }  
  }

  async presentAlertError(){
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Código incorrecto.',
      buttons: ['OK']
    });
    await alert.present();
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
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  getCodigo(){
    return this.form.get('codigo');
  }
}
